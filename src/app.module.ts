import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {GraphqlModule} from './graphql/graphql.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
            }
        }),
        GraphqlModule,
    ],
})
export class AppModule {}
