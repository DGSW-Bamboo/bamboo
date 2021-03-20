import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { MONGO_URL } from './constants';
import { StoryModule } from './story/story.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/apollo-server/src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    StoryModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
