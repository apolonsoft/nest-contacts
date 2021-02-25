import { ExtendedSchemaPrinter } from 'extended-schema-printer'
import { NestFactory } from '@nestjs/core'
import { AppModule, AppModuleForSchemaGeneration } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as path from 'path'
import { Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'

const logger = new Logger('AppBootstrap')

const DEFAULT_TCP_CONNECTION_HOST = 'localhost'
const DEFAULT_TCP_CONNECTION_PORT = 4013

async function bootstrap() {
    await ExtendedSchemaPrinter.createSchemaFile(
        AppModuleForSchemaGeneration,
        path.join(process.cwd(), 'schema.graphql'),
    )

    const app = await NestFactory.create(AppModule)

    const configService = app.get(ConfigService)

    const port = app.get(ConfigService).get('PORT') || 3000
    const hostname = app.get(ConfigService).get('HOST') || 'localhost'

    const tcpConnectionsHost =
        configService.get('TCP_CONNECTIONS_HOST') || DEFAULT_TCP_CONNECTION_HOST

    const tcpConnectionsPort =
        configService.get('TCP_CONNECTIONS_PORT') || DEFAULT_TCP_CONNECTION_PORT

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: tcpConnectionsHost,
            port: tcpConnectionsPort,
        },
    })

    await app.startAllMicroservicesAsync()

    await app.listen(port, hostname, () =>
        logger.log(`Server running at ${hostname}:${port}`),
    )
}
bootstrap()
