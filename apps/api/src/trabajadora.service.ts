import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTrabajadoraDto, UpdateTrabajadoraDto } from './trabajadora.dto';

function validarDNI(dni: string): boolean {
  const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/i;
  if (!dniRegex.test(dni)) return false;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const numero = parseInt(dni.substring(0, 8), 10);
  const letra = dni[8].toUpperCase();
  return letras[numero % 23] === letra;
}

@Injectable()
export class TrabajadoraService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.trabajadora.findMany();
  }

  async findOne(id: string) {
    const trabajadora = await this.prisma.trabajadora.findUnique({
      where: { id },
    });
    if (!trabajadora) throw new NotFoundException('Trabajadora no encontrada');
    return trabajadora;
  }

  async create(data: CreateTrabajadoraDto) {
    if (!validarDNI(data.dni)) {
      throw new BadRequestException('DNI inválido');
    }
    try {
      return await this.prisma.trabajadora.create({ data });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Email o DNI ya existen');
      }
      throw e;
    }
  }

  async update(id: string, data: UpdateTrabajadoraDto) {
    if (data.dni && !validarDNI(data.dni)) {
      throw new BadRequestException('DNI inválido');
    }
    try {
      return await this.prisma.trabajadora.update({ where: { id }, data });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Email o DNI ya existen');
      }
      if (e.code === 'P2025') {
        throw new NotFoundException('Trabajadora no encontrada');
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.trabajadora.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Trabajadora no encontrada');
      }
      throw e;
    }
  }
}
