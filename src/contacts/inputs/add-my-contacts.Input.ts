import { InputType, Field } from '@nestjs/graphql'
import { ContactInput } from './contact.input'
import { ArrayNotEmpty, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class AddMyContactsInput {
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ContactInput)
    @Field(() => [ContactInput], { nullable: 'items' })
    contactInfo: ContactInput[]
}
