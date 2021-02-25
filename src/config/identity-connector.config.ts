import { ConnectorAsyncOptions, ConnectorOptions } from '@banxe/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

const DEFAULT_IDENTITY_MICROSERVICE_HOST = 'localhost'
const DEFAULT_IDENTITY_MICROSERVICE_PORT = 4013

export const identityConnectorConfig: ConnectorAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): ConnectorOptions => ({
        host:
            configService.get('IDENTITY_MICROSERVICE_HOST') ||
            DEFAULT_IDENTITY_MICROSERVICE_HOST,
        port:
            configService.get('IDENTITY_MICROSERVICE_PORT') ||
            DEFAULT_IDENTITY_MICROSERVICE_PORT,
    }),
    inject: [ConfigService],
}
