import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { StoryState } from './story.type';

registerEnumType(StoryState, {
  name: "StoryState",
  description: "이야기의 상태",
});

@ObjectType()
@Schema()
export class Story {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { nullable: true })
  @Prop()
  index: number;

  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => StoryState, { defaultValue: StoryState.PENDING })
  @Prop({ type: StoryState })
  state: StoryState;

  @Field(() => Date, { defaultValue: new Date() })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ nullable: true })
  rejectedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ nullable: true })
  approvedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ nullable: true })
  censoredAt?: Date;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
