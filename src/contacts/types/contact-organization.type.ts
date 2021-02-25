import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ContactOrganization')
export class ContactOrganizationType {
    @Field(() => String, { nullable: true })
    jobTitle?: string

    @Field(() => String, { nullable: true })
    departmentName?: string

    @Field(() => String, { nullable: true })
    organizationName?: string
}
