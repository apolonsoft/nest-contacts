import { contactEmailSchema } from './contact-email.schema'
import { contactSocialSchema } from './contact-social.schema'
import { contactPhoneShema } from './contact-phone.schema'
import { Schema, SchemaTypes } from 'mongoose'
import { contactUrlSchema } from './contact-url-schema'
import { v4 } from 'uuid'
import { Contact } from '../interfaces/contact.interface'
import { contactAddressSchema } from './contact-address.schema'

export const contactSchema = new Schema<Contact>(
    {
        id: {
            type: Schema.Types.String,
            default: v4(),
            index: true,
            unique: true,
        },
        name: {
            type: Object,
        },
        nickName: String,
        organization: {
            type: Object,
            default: null,
        },
        socials: {
            type: [contactSocialSchema],
            default: null,
        },
        birthday: {
            type: Schema.Types.Date,
            default: null,
        },
        isBanxeUser: {
            type: Schema.Types.Boolean,
            default: false,
        },
        emails: {
            type: [contactEmailSchema],
            default: null,
        },
        phones: {
            type: [contactPhoneShema],
            default: null,
        },
        addresses: {
            type: [contactAddressSchema],
            default: null,
        },
        urls: {
            type: [contactUrlSchema],
            default: null,
        },
        imageId: {
            type: Schema.Types.String,
            default: null,
        },
        isDeleted: {
            type: Schema.Types.Boolean,
            default: false,
        },
        isPaysendUser: {
            type: Schema.Types.Boolean,
        },
        userId: {
            type: SchemaTypes.String,
            required: true,
        },
        iban: {
            type: Schema.Types.String,
            default: null,
        },
        cardNumber: {
            type: Schema.Types.String,
            default: null,
        },
        swift: {
            type: Schema.Types.String,
            default: null,
        },
        accountNumber: {
            type: Schema.Types.String,
            default: null,
        },
    },
    { timestamps: true },
)
