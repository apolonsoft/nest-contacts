import { InputType, Field, ID } from '@nestjs/graphql'
import {
    CardNumberScalar,
    FullNameInput,
    IBANScalar,
    SWIFTScalar,
} from '@banxe/common'
import { ContactOrganizationInput } from './contact-organization.input'
import { ContactUrlInput } from './contact-url.input'
import { ContactAddressInput } from './contact-address.input'
import { ContactPhoneInput } from './contact-phone.input'
import { ContactEmailInput } from './contact-email.input'
import { ContactSocialInput } from './contact-social.input'
import {
    IsUUID,
    IsOptional,
    ValidateNested,
    IsNotEmptyObject,
} from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class ContactInput {
    @IsOptional()
    @Type(() => FullNameInput)
    @IsNotEmptyObject()
    @Field(() => FullNameInput, { nullable: true })
    name?: FullNameInput

    @IsOptional()
    @Field(() => String, { nullable: true })
    nickName?: string

    @IsOptional()
    @Type(() => ContactOrganizationInput)
    @IsNotEmptyObject()
    @Field(() => ContactOrganizationInput, { nullable: true })
    organization?: ContactOrganizationInput

    @IsOptional()
    @Type(() => ContactSocialInput)
    @ValidateNested({ each: true })
    @Field(() => [ContactSocialInput], { nullable: 'itemsAndList' })
    socials?: ContactSocialInput[]

    @IsOptional()
    @Type(() => ContactUrlInput)
    @ValidateNested({ each: true })
    @Field(() => [ContactUrlInput], { nullable: 'itemsAndList' })
    urls?: ContactUrlInput[]

    @IsOptional()
    @Type(() => ContactEmailInput)
    @ValidateNested({ each: true })
    @Field(() => [ContactEmailInput], { nullable: 'itemsAndList' })
    emails?: ContactEmailInput[]

    @IsOptional()
    @Type(() => ContactPhoneInput)
    @ValidateNested({ each: true })
    @Field(() => [ContactPhoneInput], { nullable: 'itemsAndList' })
    phones?: ContactPhoneInput[]

    @IsOptional()
    @IsUUID('all')
    @Field(() => ID, { nullable: true })
    imageFileId?: string

    @IsOptional()
    @Type(() => ContactAddressInput)
    @ValidateNested({ each: true })
    @Field(() => [ContactAddressInput], { nullable: 'itemsAndList' })
    addresses?: ContactAddressInput[]

    @IsOptional()
    @Field(() => Date, { nullable: true })
    birthday?: Date

    @IsOptional()
    @Field(() => IBANScalar, { nullable: true })
    iban: string

    @IsOptional()
    @Field(() => CardNumberScalar, { nullable: true })
    cardNumber: string

    @IsOptional()
    @Field(() => SWIFTScalar, { nullable: true })
    swift: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    accountNumber: string
}
