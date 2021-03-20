import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Admin {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  name: string;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
