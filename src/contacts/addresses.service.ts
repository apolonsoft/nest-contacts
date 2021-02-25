import { IdentityConnectorService } from '@banxe/common'
import { Injectable, Logger } from '@nestjs/common'
import { ContactAddress } from '../contacts/interfaces/contact-address.interface'

@Injectable()
export class AddressesService {
    private readonly logger: Logger = new Logger(AddressesService.name)

    constructor(
        private readonly identityRemoteService: IdentityConnectorService,
    ) {}

    async verifyAddress(
        addresses: ContactAddress[],
    ): Promise<ContactAddress[]> {
        if (process.env.MOCK_REMOTE_SERVICES) {
            return addresses
        }

        const fetchedAddresses = await Promise.all(
            addresses.map(async ({ addressId, type }) => {
                const { id } = await this.identityRemoteService.getAddress({
                    addressId,
                })
                if (id) {
                    return {
                        addressId,
                        type,
                    }
                }

                return null
            }),
        )

        return fetchedAddresses.filter(address => address != null)
    }
}
