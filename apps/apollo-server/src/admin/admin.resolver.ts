import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { LoginInput, RegisterInput } from './admin.input';
import { Admin, AdminRole } from './admin.model';
import { Authorized } from '../auth/auth.guard';

@Resolver()
export class AdminResolver {
  constructor(
    private adminService: AdminService
  ) {}

  @Mutation(() => String)
  login(@Args('input') input: LoginInput) {
    return this.adminService.login(input);
  }

  @Authorized(AdminRole.SUPERVISOR)
  @Mutation(() => Admin)
  register(@Args('input') input: RegisterInput) {
    return this.adminService.register(input);
  }
}
