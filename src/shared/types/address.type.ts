import { Field, ID, Directive } from '@nestjs/graphql'
import { ObjectExtendType } from 'extended-schema-printer'

@ObjectExtendType('Address')
@Directive('@key(fields: "id")')
export class AddressType {
    @Field(() => ID)
    @Directive('@external')
    id: string
}
