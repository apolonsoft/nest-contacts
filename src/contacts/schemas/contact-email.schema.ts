import { Schema } from 'mongoose'
import { ContactEmail } from '../interfaces/contact-email.interface'

export const contactEmailSchema = new Schema<ContactEmail>(
    {
        type: {
            type: String,
            uppercase: true,
            default: '',
        },
        email: {
            type: String,
            uppercase: true,
            required: true,
        },
    },
    { _id: false },
)
