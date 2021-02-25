import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class RemoveMyContactsInput {
    @IsUUID('all', { each: true })
    @Field(() => [ID])
    contactIds: string[]
}
