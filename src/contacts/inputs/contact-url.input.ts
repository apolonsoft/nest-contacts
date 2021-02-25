import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsUrl } from 'class-validator'

@InputType()
export class ContactUrlInput {
    @IsOptional()
    @IsUrl()
    @Field(() => String, { nullable: true })
    url?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string
}
