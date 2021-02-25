import { Schema } from 'mongoose'
import { ContactUrl } from '../interfaces/contact-url.interface'

export const contactUrlSchema = new Schema<ContactUrl>(
    {
        type: {
            type: String,
            uppercase: true,
            default: '',
        },
        url: {
            type: String,
            requied: true,
        },
    },
    { _id: false },
)
