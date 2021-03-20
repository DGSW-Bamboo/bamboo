import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './story.model';
import { StoryResolver } from './story.resolver';
import { StoryService } from './story.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
  ],
  providers: [StoryResolver, StoryService]
})
export class StoryModule {}
