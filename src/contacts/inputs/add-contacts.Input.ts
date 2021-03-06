import { InputType, Field, ID } from '@nestjs/graphql'
import { ContactInput } from './contact.input'
import { ArrayNotEmpty, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class AddContactsInput {
    @IsUUID()
    @Field(() => ID)
    userId: string

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ContactInput)
    @Field(() => [ContactInput], { nullable: 'items' })
    contactInfo: ContactInput[]
}
