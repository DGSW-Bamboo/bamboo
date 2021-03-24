import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { StoryState } from './story.type';
import { Story, StorySchema } from './story.model';

@InputType()
export class StoryFilter {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 20;
}

@InputType()
export class StoryFilterForAdmin extends StoryFilter {
  @Field(() => StoryState)
  @Prop({ type: StoryState })
  state: StoryState = StoryState.PENDING;
}

@InputType()
export class newStoryInput {
  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => StoryState)
  @Prop({ type: StoryState })
  state: StoryState = StoryState.PENDING;

  @Field(() => Date)
  @Prop({ type: Date })
  createdAt: Date = new Date();
}

@InputType()
export class ChangeStoryStateInput {
  @Field(() => ID)
  @Prop({ type: ID })
  id: Story['_id'];
}
