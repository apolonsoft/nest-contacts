import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ContactSocial')
export class ContactSocialType {
    @Field(() => String)
    id: string

    @Field(() => String, { nullable: true })
    type?: string
}
