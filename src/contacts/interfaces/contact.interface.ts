import { ContactEmail } from './contact-email.interface'
import { ContactOrganization } from './contact-organization.interface'
import { ContactSocial } from './contact-social.interface'
import { ContactPhone } from './contact-phone.interface'
import { Document } from 'mongoose'
import { FullName } from 'src/shared/interfaces/fullname.interface'
import { CommonInfo } from 'src/shared/interfaces/common-info.interface'
import { ContactUrl } from './contact-url.interface'
import { ContactAddress } from 'src/contacts/interfaces/contact-address.interface'

export class Contact extends Document {
    id: string
    name?: FullName
    nickName?: string
    organization?: ContactOrganization
    socials?: ContactSocial[]
    urls?: ContactUrl[]
    birthday?: Date
    isBanxeUser?: boolean
    emails?: ContactEmail[]
    phones?: ContactPhone[]
    addresses?: ContactAddress[]
    imageId?: string
    common: CommonInfo
    userId: string
    isPaysendUser: boolean
    iban: string
    cardNumber: string
    swift: string
    accountNumber: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}
