import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './app.controller';

function validarDNI(dni: string): boolean {
  // Formato: 8 dígitos + letra
  const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/i;
  if (!dniRegex.test(dni)) return false;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const numero = parseInt(dni.substring(0, 8), 10);
  const letra = dni[8].toUpperCase();
  return letras[numero % 23] === letra;
}

@Injectable()
export class AppService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  async getUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async createUsuario(data: CreateUsuarioDto) {
    // Validación extra de DNI
    if (!validarDNI(data.dni)) {
      throw new BadRequestException('DNI inválido');
    }
    return this.prisma.usuario.create({ data });
  }
}
