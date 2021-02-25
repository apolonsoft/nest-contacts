import { Document } from 'mongoose'

export class ContactUrl extends Document {
    type?: string
    url: string
}
