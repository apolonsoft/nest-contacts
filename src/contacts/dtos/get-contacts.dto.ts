export class GetContactsDto {
    contactQuery?: string
    filter?: {
        ids?: string[]
        skip?: number
        limit?: number
    }
    deleted?: boolean
}
