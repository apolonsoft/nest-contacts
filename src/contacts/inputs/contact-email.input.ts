import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsOptional } from 'class-validator'

@InputType()
export class ContactEmailInput {
    @IsEmail()
    @Field(() => String)
    email: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string
}
