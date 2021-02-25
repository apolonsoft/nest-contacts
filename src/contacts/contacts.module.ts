import { Module } from '@nestjs/common'
import { ContactsResolver } from './contacts.resolver'
import { ContactsService } from './contacts.service'
import { MongooseModule } from '@nestjs/mongoose'
import { contactSchema } from './schemas/contact.schema'
import { ImagesModule } from '../images/images.module'
import {
    AuthConnectorModule,
    CardNumberScalar,
    IBANScalar,
    IdentityConnectorModule,
    SWIFTScalar,
} from '@banxe/common'
import { authConnectorConfig } from '../config/auth-connector.config'
import { identityConnectorConfig } from '../config/identity-connector.config'
import { AddressesService } from './addresses.service'
import { UsersService } from './users.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Contacts', schema: contactSchema },
        ]),
        ImagesModule,
        AuthConnectorModule.registerAsync(authConnectorConfig),
        IdentityConnectorModule.registerAsync(identityConnectorConfig),
        IBANScalar,
        SWIFTScalar,
        CardNumberScalar,
    ],
    providers: [
        ContactsResolver,
        ContactsService,
        AddressesService,
        UsersService,
    ],
})
export class ContactsModule {}
