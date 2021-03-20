import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { LoginInput } from './admin.input';

@Resolver()
export class AdminResolver {
  constructor(
    private adminService: AdminService
  ) {}

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    const admin = await this.adminService.login(input);

    return this.adminService.createToken(admin);
  }
}
