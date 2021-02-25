import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class ContactSocialInput {
    @IsNotEmpty()
    @Field(() => String)
    id: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string
}
