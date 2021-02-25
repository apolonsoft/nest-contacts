import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
    ResolveReference,
} from '@nestjs/graphql'
import { AddContactsInput } from './inputs/add-contacts.Input'
import { RemoveContactsInput } from './inputs/remove-contacts.input'
import { RemoveMyContactsInput } from './inputs/remove-my-contacts.input'
import { ContactsInput } from './inputs/contacts.input'
import { MyContactsInput } from './inputs/my-contacts.input'
import { ContactType } from './types/contact.types'
import {
    GqlCurrentUser,
    RoleGuard,
    RequireRole,
    GatewayRequestHeaderRole,
    AuthGuard,
    CommonItemInfoType,
    User,
} from '@banxe/common'
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { ContactAddress } from 'src/contacts/interfaces/contact-address.interface'
import { FileType } from 'src/shared/types/file.type'
import { ContactAddressType } from './types/contact-address.type'
import { UpdateMyContactInput } from './inputs/update-my-contact.input'

@Resolver(() => ContactType)
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
export class ContactsResolver {
    constructor(private readonly contactsService: ContactsService) {}

    @Query(() => [ContactType], {
        nullable: 'items',
        description: '[Contacts] Get current user contacts. (User Only)',
    })
    async myContacts(
        @GqlCurrentUser() { id }: User,
        @Args('input') input: MyContactsInput,
    ): Promise<ContactType[]> {
        return await this.contactsService.get(id, input)
    }

    @Query(() => [ContactType], {
        nullable: 'items',
        description: '[Contacts] Get all contacts. (Admin Only)',
    })
    @RequireRole(GatewayRequestHeaderRole.ADMIN)
    @UseGuards(RoleGuard)
    async contacts(
        @Args('input') input: ContactsInput,
    ): Promise<ContactType[]> {
        return await this.contactsService.get(undefined, input)
    }

    @ResolveField(() => CommonItemInfoType)
    common(@Parent() contact: ContactType): CommonItemInfoType {
        return {
            isDeleted: contact.isDeleted,
            timestamps: {
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt,
            },
        }
    }

    @Mutation(() => [ContactType], {
        nullable: 'items',
        description: '[Contacts] Create new contacts. (Admin Only)',
    })
    @RequireRole(GatewayRequestHeaderRole.ADMIN)
    @UseGuards(RoleGuard)
    async addContacts(
        @Args('input')
        input: AddContactsInput,
    ): Promise<ContactType[]> {
        return await this.contactsService.upsert({
            userId: input.userId,
            contacts: input.contactInfo,
        })
    }

    @Mutation(() => [ContactType], {
        description: '[Contacts] Delete contacts by ID. (Admin Only)',
    })
    @RequireRole(GatewayRequestHeaderRole.ADMIN)
    @UseGuards(RoleGuard)
    async removeContacts(
        @Args('input') input: RemoveContactsInput,
    ): Promise<ContactType[]> {
        return await this.contactsService.remove({
            userId: input.userId,
            contacts: input.contactIds,
        })
    }

    @Mutation(() => [ContactType], {
        nullable: 'items',
        description:
            '[Contacts] Create or update (Upsert) contact for current user. (User Only). Invalid phones will be filtred',
    })
    async updateMyContacts(
        @GqlCurrentUser() user: User,
        @Args('input')
        input: UpdateMyContactInput,
    ): Promise<ContactType[]> {
        const result = await this.contactsService.upsert({
            userId: user.id,
            contacts: input.contactInfo,
        })

        return result
    }

    @Mutation(() => [ContactType], {
        description:
            '[Contacts] Delete current user contacts by ID. (User only)',
    })
    async removeMyContacts(
        @GqlCurrentUser() user: User,
        @Args('input') input: RemoveMyContactsInput,
    ): Promise<ContactType[]> {
        return await this.contactsService.remove({
            userId: user.id,
            contacts: input.contactIds,
        })
    }

    @ResolveField(() => [ContactAddressType])
    addresses(
        @Parent()
        parent: {
            addresses: ContactAddress[]
        } /* from Contact schema interface */,
    ): ContactAddressType[] {
        return parent.addresses.map(address => ({
            type: address.type,
            address: {
                id: address.addressId,
            },
        }))
    }

    @ResolveField(() => FileType)
    image(
        @Parent()
        {
            imageId: id,
        }: { imageId: string } /* from Contact schema interface */,
    ): FileType {
        if (!id) {
            return null
        }

        return {
            id,
        }
    }

    @ResolveReference()
    async getContact({ id }: { id }): Promise<ContactType> {
        return await this.contactsService.getById(id)
    }
}
