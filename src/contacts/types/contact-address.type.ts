import { ObjectType, Field } from '@nestjs/graphql'
import { AddressType } from '../../shared/types/address.type'

@ObjectType('ContactAddress')
export class ContactAddressType {
    @Field(() => AddressType)
    address?: AddressType

    @Field(() => String, { nullable: true })
    type?: string
}
