import { Field, InputType, Int } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { StoryState } from './story.type';

@InputType()
export class StoryFilter {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 20;
}

@InputType()
export class StoryInput {
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
