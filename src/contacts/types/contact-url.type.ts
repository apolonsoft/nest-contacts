import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ContactUrl')
export class ContactUrlType {
    @Field(() => String, { nullable: true })
    url?: string

    @Field(() => String, { nullable: true })
    type?: string
}
