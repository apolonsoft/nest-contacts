import { Injectable, Logger } from '@nestjs/common'
import { FilesConnectorService } from '@banxe/common'

@Injectable()
export class ImagesService {
    private readonly _logger: Logger = new Logger(ImagesService.name)

    constructor(private readonly filesRemoteService: FilesConnectorService) {}

    async getUserFile(fileId: string, userId: string): Promise<string> {
        if (process.env.MOCK_REMOTE_SERVICES) {
            return fileId
        }

        const image = await this.filesRemoteService.getFileInfo({
            fileId,
            userId,
        })

        if (!image) {
            this._logger.warn(`Image file '${fileId}' does not exist`)
            return null
        }

        return image.id
    }
}
