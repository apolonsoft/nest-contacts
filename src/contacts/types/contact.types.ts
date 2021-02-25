import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'
import { FileType } from '../../shared/types/file.type'
import {
    CardNumberScalar,
    CommonItemInfoType,
    FullNameType,
    IBANScalar,
    SWIFTScalar,
} from '@banxe/common'
import { ContactPhoneType } from './contact-phone.type'
import { ContactEmailType } from './contact-email.type'
import { ContactSocialType } from './contact-social.type'
import { ContactAddressType } from './contact-address.type'
import { ContactUrlType } from './contact-url.type'
import { ContactOrganizationType } from './contact-organization.type'

@ObjectType('Contact')
@Directive('@key(fields: "id")')
export class ContactType {
    @Field(() => ID)
    id: string

    @Field(() => FullNameType, { nullable: true })
    name?: FullNameType

    @Field(() => String, { nullable: true })
    nickName?: string

    @Field(() => ContactOrganizationType, { nullable: true })
    organization?: ContactOrganizationType

    @Field(() => [ContactSocialType], { nullable: 'itemsAndList' })
    socials?: ContactSocialType[]

    @Field(() => [ContactUrlType], { nullable: 'itemsAndList' })
    urls?: ContactUrlType[]

    @Field(() => [ContactEmailType], { nullable: 'itemsAndList' })
    emails?: ContactEmailType[]

    @Field(() => [ContactPhoneType], { nullable: 'itemsAndList' })
    phones?: ContactPhoneType[]

    @Field(() => [ContactAddressType], {
        nullable: 'itemsAndList',
    })
    addresses?: ContactAddressType[]

    @Field(() => Date, { nullable: true })
    birthday?: Date

    @Field(() => Boolean)
    isBanxeUser?: boolean

    isDeleted: boolean
    createdAt: Date
    updatedAt: Date

    @Field(() => CommonItemInfoType)
    common: CommonItemInfoType

    @Field(() => FileType, { nullable: true })
    image?: FileType

    @Field(() => Boolean)
    isPaysendUser: boolean

    @Field(() => IBANScalar, { nullable: true })
    iban: string

    @Field(() => CardNumberScalar, { nullable: true })
    cardNumber: string

    @Field(() => SWIFTScalar, { nullable: true })
    swift: string

    @Field(() => String, { nullable: true })
    accountNumber: string
}
