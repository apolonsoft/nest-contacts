import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ContactPhone')
export class ContactPhoneType {
    @Field(() => String)
    phone: string

    @Field(() => String, { nullable: true })
    type?: string

    @Field(() => Boolean, { nullable: true })
    isDeleted: boolean
}
