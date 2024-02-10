import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('create')
  async addRole(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.rolesService.addRole(name, description);
  }
}
