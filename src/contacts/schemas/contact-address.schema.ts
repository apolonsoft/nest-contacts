import { Schema } from 'mongoose'
import { ContactAddress } from '../interfaces/contact-address.interface'

export const contactAddressSchema = new Schema<ContactAddress>(
    {
        type: {
            type: Schema.Types.String,
            default: '',
        },
        addressId: {
            type: Schema.Types.String,
        },
    },
    { _id: false },
)
