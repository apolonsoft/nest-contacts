import { FilterInput } from '@banxe/common'
import { InputType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsOptional, IsNotEmptyObject, ValidateNested } from 'class-validator'

@InputType()
export class MyContactsInput {
    @IsOptional()
    @Field(() => String, {
        nullable: true,
        description: `Contact keywords such as: e-mail, phone number, firstname, lastname...any name.`,
    })
    contactQuery?: string

    @IsOptional()
    @Type(() => FilterInput)
    @ValidateNested()
    @IsNotEmptyObject()
    @Field(() => FilterInput, { nullable: true })
    filter?: FilterInput

    @Field(() => Boolean, {
        nullable: true,
        description: 'If set to true, deleted contacts included in result.',
    })
    deleted: boolean
}
