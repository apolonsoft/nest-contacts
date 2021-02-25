import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, ValidateNested } from 'class-validator'
import { ContactInput } from './contact.input'

@InputType()
export class UpdateMyContactInput {
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ContactInput)
    @Field(() => [ContactInput], { nullable: 'items' })
    contactInfo: ContactInput[]
}
