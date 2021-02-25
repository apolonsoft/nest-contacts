import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { CreateContactsDto } from './dtos/create-contacts.dto'
import { RemoveContactsDto } from './dtos/remove-contacts.dto'
import { Contact } from './interfaces/contact.interface'
import { Model, Mongoose, MongooseFilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ImagesService } from '../images/images.service'
import { merge } from './helpers/contact.helper'
import { AuthConnectorService } from '@banxe/common'
import { GetContactsDto } from './dtos/get-contacts.dto'
import { v4 } from 'uuid'
import { ContactInfoDto } from './dtos/contact-info.dto'
import { AddressesService } from './addresses.service'
import { UsersService } from './users.service'
import { filterInvalidPhoneNumbers } from '../helpers/phone-number.helper'
import { ContactPhone } from './interfaces/contact-phone.interface'

@Injectable()
export class ContactsService {
    private readonly _logger: Logger = new Logger(ContactsService.name)

    constructor(
        @InjectModel('Contacts')
        private readonly contacts: Model<Contact>,
        private readonly addressesService: AddressesService,
        private readonly usersService: UsersService,
        private readonly imagesService: ImagesService,
    ) {}

    get(user?: string, query?: GetContactsDto): Promise<Contact[]> {
        const { filter, deleted, contactQuery } = query

        const condition: MongooseFilterQuery<Contact> = {}
        if (!deleted) {
            condition.isDeleted = false
        }

        if (user) {
            condition.userId = user
        }

        const { ids, limit, skip } = filter || { limit: 20, skip: 0 }
        if (ids) {
            condition.id = { $in: ids }
        }

        // check for null, undefined, empty string or any false value.
        if (contactQuery) {
            // This regex check guards against melicious input
            // for example regex expression. So only normal
            // text and numbers with underscore, hyphen, space, dot and @
            // are allowed.
            const validQueryRegex = /^[a-zA-Z\wа-яА-Я0-9_ @.-]*$/

            if (!validQueryRegex.test(contactQuery)) {
                throw new BadRequestException('Invalid search query')
            }

            const expr = new RegExp(`${contactQuery}`, 'i')
            condition.$or = [
                { nickName: expr },
                { 'name.firstName': expr },
                { 'name.lastName': expr },
                { 'name.middleName': expr },
                { 'name.legalName': expr },
                { emails: { $elemMatch: { email: expr } } },
                { phones: { $elemMatch: { phone: expr } } },
                { socials: { $elemMatch: { id: expr } } },
            ]
        }

        return this.contacts
            .find(condition, undefined, {
                skip,
                limit,
            })
            .exec()
    }

    async getById(id: string): Promise<Contact> {
        return await this.contacts.findOne({ id })
    }

    async getByEmailOrPhone(
        userId: string,
        {
            emails,
            phones,
        }: {
            emails?: string[]
            phones?: string[]
        },
    ): Promise<Contact | null> {
        const searchConditions: MongooseFilterQuery<Contact>[] = []

        if (emails) {
            searchConditions.push({
                emails: {
                    $elemMatch: {
                        email: emails,
                    },
                },
            })
        }

        if (phones) {
            searchConditions.push({
                phones: {
                    $elemMatch: {
                        phone: phones,
                    },
                },
            })
        }
        return await this.contacts.findOne({ userId, $or: searchConditions })
    }

    async update(
        userId: string,
        contact: ContactInfoDto,
    ): Promise<Contact | null> {
        const {
            name,
            nickName,
            organization,
            birthday,
            /* */
            emails,
            phones,
            socials,
            urls,
            addresses,
            /* */
            accountNumber,
            swift,
            cardNumber,
            isPaysendUser,
            iban,
            /* */
            imageFileId,
        } = contact
        let validPhones: ContactPhone[] = null

        if (phones) {
            validPhones = filterInvalidPhoneNumbers(phones)
        }

        const existing = await this.getByEmailOrPhone(userId, {
            emails: emails?.map(e => e.email),
            phones: validPhones?.map(p => p.phone),
        })

        if (existing) {
            const deletedPhones = existing.phones.filter(
                oldPhone =>
                    !validPhones.some(
                        newPhone => newPhone.phone === oldPhone.phone,
                    ),
            )

            deletedPhones.forEach(p => {
                p.isDeleted = true
            })

            validPhones.push(...deletedPhones)

            const mergedEmails = merge(emails, existing.emails)
            const mergedUrls = merge(urls, existing.urls)
            const mergedSocials = merge(socials, existing.socials)
            const mergedAddresses = merge(addresses, existing.addresses)

            return await this.contacts.findOneAndUpdate(
                {
                    id: existing.id,
                },
                {
                    name,
                    nickName,
                    organization,
                    birthday,
                    imageId: imageFileId,
                    accountNumber,
                    swift,
                    cardNumber,
                    isPaysendUser,
                    iban,
                    /* phones and emails */
                    phones: validPhones,
                    emails: mergedEmails,
                    /* social and urls */
                    urls: mergedUrls,
                    socials: mergedSocials,
                    /* addresses */
                    addresses: mergedAddresses,
                },
                {
                    new: true,
                    omitUndefined: true,
                },
            )
        }

        return null
    }

    async upsert(data: CreateContactsDto): Promise<Contact[]> {
        const { userId, contacts } = data

        return await Promise.all(
            contacts.map(
                async (contact): Promise<Contact> => {
                    // verify user identity, by-pass if MOCK_REMOTE_SERVICES is set (for development only)
                    if (!(await this.usersService.verifyUser(userId))) {
                        throw new Error(`User ${userId} does not exist.`)
                    }

                    // verify addresses, filter out any non-existing addresses.
                    const verifiedAddresses =
                        contact.addresses != null
                            ? await this.addressesService.verifyAddress(
                                  contact.addresses,
                              )
                            : []

                    const validPhones = filterInvalidPhoneNumbers(
                        contact.phones,
                    )

                    // verify contact image file id.
                    contact.imageFileId =
                        contact.imageFileId != null
                            ? await this.imagesService.getUserFile(
                                  contact.imageFileId,
                                  userId,
                              )
                            : null

                    // Update
                    const updated = await this.update(userId, contact)

                    if (updated) {
                        return updated
                    }

                    // Otherwise, create
                    const {
                        name,
                        nickName,
                        organization,
                        emails,
                        socials,
                        urls,
                        birthday,
                        accountNumber,
                        swift,
                        cardNumber,
                        isPaysendUser,
                        iban,
                        imageFileId: imageId,
                    } = contact

                    const instance: Contact & any = {
                        id: v4(),
                        userId,
                        name,
                        nickName,
                        organization,
                        birthday,
                        /* paysend fields */
                        accountNumber,
                        swift,
                        cardNumber,
                        isPaysendUser,
                        iban,
                        /* social and urls */
                        socials,
                        urls,
                        /* emails and phones */
                        emails,
                        phones: validPhones,
                        /* addresses */
                        addresses: verifiedAddresses,
                        imageId,
                    }

                    return await this.contacts.create(instance)
                },
            ),
        )
    }

    async remove(data: RemoveContactsDto): Promise<Contact[]> {
        await this.contacts
            .updateMany(
                {
                    id: { $in: data.contacts },
                    userId: data.userId,
                },
                {
                    $set: {
                        isDeleted: true,
                    },
                },
            )
            .exec()

        return this.contacts.find({
            $and: [{ id: { $in: data.contacts } }, { userId: data.userId }],
        })
    }
}
