import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {GraphqlModule} from './graphql/graphql.module';
import {WebSocketModule} from './webSocket/webSocket.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
            }
        }),
        GraphqlModule,
        WebSocketModule,
    ],
})
export class AppModule {}
