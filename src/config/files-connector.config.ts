import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConnectorAsyncOptions, ConnectorOptions } from '@banxe/common'

const DEFAULT_FILES_MICROSERVICE_HOST = 'localhost'
const DEFAULT_FILES_MICROSERVICE_PORT = 4010

export const filesConnectorConfig: ConnectorAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): ConnectorOptions => ({
        host:
            configService.get('FILES_MICROSERVICE_HOST') ||
            DEFAULT_FILES_MICROSERVICE_HOST,
        port:
            configService.get('FILES_MICROSERVICE_PORT') ||
            DEFAULT_FILES_MICROSERVICE_PORT,
    }),
    inject: [ConfigService],
}
