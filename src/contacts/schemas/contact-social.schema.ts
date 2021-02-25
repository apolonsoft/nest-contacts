import { Schema } from 'mongoose'
import { ContactSocial } from '../interfaces/contact-social.interface'

export const contactSocialSchema = new Schema<ContactSocial>(
    {
        type: {
            type: String,
            uppercase: true,
            default: '',
        },
        id: {
            type: String,
            required: true,
        },
    },
    { _id: false },
)
