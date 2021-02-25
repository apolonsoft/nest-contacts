import { InputType, Field } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class ContactPhoneInput {
    @Field(() => String)
    phone: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string
}
