import { Module } from '@nestjs/common'
import { ImagesService } from './images.service'
import { FilesConnectorModule } from '@banxe/common'
import { filesConnectorConfig } from '../config/files-connector.config'

@Module({
    imports: [FilesConnectorModule.registerAsync(filesConnectorConfig)],
    providers: [ImagesService],
    exports: [ImagesService],
})
export class ImagesModule {}
