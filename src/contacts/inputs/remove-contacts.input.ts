import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class RemoveContactsInput {
    @IsUUID()
    @Field(() => ID)
    userId: string

    @IsUUID('all', { each: true })
    @Field(() => [ID])
    contactIds: string[]
}
