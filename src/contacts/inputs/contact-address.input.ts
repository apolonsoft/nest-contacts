import { InputType, Field, ID } from '@nestjs/graphql'
import { IsOptional, IsUUID } from 'class-validator'

@InputType()
export class ContactAddressInput {
    @IsUUID()
    @Field(() => ID)
    addressId: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string
}
