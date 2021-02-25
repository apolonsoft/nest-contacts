import { Field, ID, Directive } from '@nestjs/graphql'
import { ObjectExtendType } from 'extended-schema-printer'

@ObjectExtendType('File')
@Directive('@key(fields: "id")')
export class FileType {
    @Field(() => ID)
    @Directive('@external')
    id: string
}
