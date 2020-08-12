import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
            }
        }),
        UserModule,
    ],
})
export class AppModule {}
