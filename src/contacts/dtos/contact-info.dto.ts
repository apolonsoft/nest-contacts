import { ContactAddress } from '../interfaces/contact-address.interface'
import { FullName } from '../../shared/interfaces/fullname.interface'
import { ContactEmail } from '../interfaces/contact-email.interface'
import { ContactOrganization } from '../interfaces/contact-organization.interface'
import { ContactPhone } from '../interfaces/contact-phone.interface'
import { ContactSocial } from '../interfaces/contact-social.interface'
import { ContactUrl } from '../interfaces/contact-url.interface'

export interface ContactInfoDto {
    name?: FullName
    nickName?: string
    organization?: ContactOrganization
    socials?: ContactSocial[]
    urls?: ContactUrl[]
    emails?: ContactEmail[]
    phones?: ContactPhone[]
    imageFileId?: string
    addresses?: ContactAddress[]
    birthday?: Date
    iban?: string
    accountNumber?: string
    swift?: string
    isPaysendUser?: boolean
    cardNumber?: string
}
