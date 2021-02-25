import { AuthConnectorService } from '@banxe/common'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class UsersService {
    private readonly _logger: Logger = new Logger(UsersService.name)

    constructor(private readonly authRemoteService: AuthConnectorService) {}

    async verifyUser(userId: string): Promise<boolean> {
        if (process.env.MOCK_REMOTE_SERVICES) {
            return true
        }

        const { id } = await this.authRemoteService.getUser({ userId })

        return id !== undefined
    }
}
