import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class LoginInput {
  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;
}
