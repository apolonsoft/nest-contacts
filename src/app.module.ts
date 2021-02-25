import { Module, ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { ContactsModule } from './contacts/contacts.module'
import { GraphQLModule, GraphQLFederationModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ImagesModule } from './images/images.module'

const getAppModuleMetadata = (withoutFederation = false): ModuleMetadata => ({
    imports: [
        ConfigModule.forRoot(config),
        MongooseModule.forRoot(process.env.MONGO_URL, {
            useFindAndModify: false,
        }),
        ContactsModule,
        ImagesModule,
        withoutFederation
            ? GraphQLModule.forRoot({ autoSchemaFile: true })
            : GraphQLFederationModule.forRoot({
                  typePaths: ['schema.graphql'],
                  buildSchemaOptions: {
                      dateScalarMode: 'timestamp',
                  },
              }),
    ],
})

@Module(getAppModuleMetadata(true))
export class AppModuleForSchemaGeneration {}

@Module(getAppModuleMetadata())
export class AppModule {}
