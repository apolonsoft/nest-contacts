import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ContactEmail')
export class ContactEmailType {
    @Field(() => String)
    email: string

    @Field(() => String, { nullable: true })
    type?: string
}
