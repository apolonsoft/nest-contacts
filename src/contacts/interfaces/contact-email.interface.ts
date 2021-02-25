import { Document } from 'mongoose'

export class ContactEmail extends Document {
    type?: string
    email: string
}
