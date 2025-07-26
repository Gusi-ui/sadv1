import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';
import { administrador } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.administrador.findUnique({
      where: { email },
    });
    if (!admin) throw new UnauthorizedException('Credenciales incorrectas');
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');
    return admin;
  }

  async login(admin: administrador) {
    const payload = {
      sub: admin.id,
      email: admin.email,
      superadmin: admin.superadmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        nombre: admin.nombre,
        apellidos: admin.apellidos,
        email: admin.email,
        superadmin: admin.superadmin,
      },
    };
  }

  async createAdmin(
    body: {
      nombre: string;
      apellidos: string;
      email: string;
      password: string;
    },
    currentUser: { superadmin?: boolean } | undefined,
  ) {
    if (!currentUser || !currentUser.superadmin) {
      throw new ForbiddenException(
        'Solo el súper admin puede crear administradores',
      );
    }
    const existing = await this.prisma.administrador.findUnique({
      where: { email: body.email },
    });
    if (existing) {
      throw new ForbiddenException('Ya existe un administrador con ese email');
    }
    const password = await bcrypt.hash(body.password, 10);
    const admin = await this.prisma.administrador.create({
      data: {
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        password,
        superadmin: false,
      },
    });
    return {
      id: admin.id,
      nombre: admin.nombre,
      apellidos: admin.apellidos,
      email: admin.email,
      superadmin: admin.superadmin,
      createdAt: admin.createdAt,
    };
  }
}
