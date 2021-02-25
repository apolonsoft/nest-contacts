import { ConnectorAsyncOptions, ConnectorOptions } from '@banxe/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

const DEFAULT_AUTH_MICROSERVICE_HOST = 'localhost'
const DEFAULT_AUTH_MICROSERVICE_PORT = 4011

export const authConnectorConfig: ConnectorAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): ConnectorOptions => ({
        host:
            configService.get('AUTH_MICROSERVICE_HOST') ||
            DEFAULT_AUTH_MICROSERVICE_HOST,
        port:
            configService.get('AUTH_MICROSERVICE_PORT') ||
            DEFAULT_AUTH_MICROSERVICE_PORT,
    }),
    inject: [ConfigService],
}
