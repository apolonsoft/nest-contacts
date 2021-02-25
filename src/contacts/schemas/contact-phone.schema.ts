import { Schema } from 'mongoose'
import { ContactPhone } from '../interfaces/contact-phone.interface'

export const contactPhoneShema = new Schema<ContactPhone>(
    {
        type: {
            uppercase: true,
            type: String,
            default: '',
        },
        phone: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { _id: false },
)
