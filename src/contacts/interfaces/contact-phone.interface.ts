import { Document } from 'mongoose'

export class ContactPhone extends Document {
    phone: string
    type?: string
    isDeleted: boolean
}
