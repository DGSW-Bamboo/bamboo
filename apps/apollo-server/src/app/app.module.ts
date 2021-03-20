import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { MONGO_URL } from '../constants';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    StoryModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/apollo-server/src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
