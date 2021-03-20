import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AdminRole } from './admin.model';

@InputType()
export class LoginInput {
  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;
}

@InputType()
export class RegisterInput extends LoginInput {
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => AdminRole)
  @Prop({ type: AdminRole })
  role: AdminRole = AdminRole.EDITOR;
}
