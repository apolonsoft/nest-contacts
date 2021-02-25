import { ContactInfoDto } from './contact-info.dto'

export interface CreateContactsDto {
    userId: string
    contacts: (ContactInfoDto | any)[]
}
