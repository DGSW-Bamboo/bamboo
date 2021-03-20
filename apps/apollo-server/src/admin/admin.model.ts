import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum AdminRole {
  EDITOR = 'EDITOR',
  SUPERVISOR = 'SUPERVISOR'
}

registerEnumType(AdminRole, {
  name: 'AdminRole',
  description: "어드민 권한 종류"
})

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

  @Field(() => AdminRole)
  @Prop({ type: AdminRole })
  role: AdminRole;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
