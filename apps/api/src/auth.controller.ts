import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminOnly } from './roles.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const admin = await this.authService.validateAdmin(
      body.email,
      body.password,
    );
    return this.authService.login(admin);
  }

  @Post('admin')
  @UseGuards(AuthGuard('jwt'))
  @SuperAdminOnly()
  async createAdmin(
    @Req() req: Request,
    @Body()
    body: {
      nombre: string;
      apellidos: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.createAdmin(body, req.user);
  }
}
