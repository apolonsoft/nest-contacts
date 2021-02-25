import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class ContactOrganizationInput {
    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    jobTitle?: string

    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    departmentName?: string

    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    organizationName?: string
}
