import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAsignacionDto, UpdateAsignacionDto } from './asignacion.dto';

@Injectable()
export class AsignacionService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.asignacion.findMany();
  }

  async findOne(id: string) {
    const asignacion = await this.prisma.asignacion.findUnique({
      where: { id },
    });
    if (!asignacion) throw new NotFoundException('Asignación no encontrada');
    return asignacion;
  }

  async create(data: CreateAsignacionDto) {
    // Validar existencia de usuario y trabajadora
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) throw new BadRequestException('Usuario no encontrado');
    const trabajadora = await this.prisma.trabajadora.findUnique({
      where: { id: data.trabajadoraId },
    });
    if (!trabajadora)
      throw new BadRequestException('Trabajadora no encontrada');
    // Validar fechas
    if (
      data.fechaFin &&
      new Date(data.fechaFin) <= new Date(data.fechaInicio)
    ) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la de inicio',
      );
    }
    return this.prisma.asignacion.create({
      data: {
        usuarioId: data.usuarioId,
        trabajadoraId: data.trabajadoraId,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
      },
    });
  }

  async update(id: string, data: UpdateAsignacionDto) {
    // Validar fechas si ambas existen
    if (
      data.fechaInicio &&
      data.fechaFin &&
      new Date(data.fechaFin) <= new Date(data.fechaInicio)
    ) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la de inicio',
      );
    }
    // Validar existencia de usuario y trabajadora si se actualizan
    if (data.usuarioId) {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: data.usuarioId },
      });
      if (!usuario) throw new BadRequestException('Usuario no encontrado');
    }
    if (data.trabajadoraId) {
      const trabajadora = await this.prisma.trabajadora.findUnique({
        where: { id: data.trabajadoraId },
      });
      if (!trabajadora)
        throw new BadRequestException('Trabajadora no encontrada');
    }
    try {
      return await this.prisma.asignacion.update({
        where: { id },
        data: {
          ...data,
          fechaInicio: data.fechaInicio
            ? new Date(data.fechaInicio)
            : undefined,
          fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Asignación no encontrada');
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.asignacion.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Asignación no encontrada');
      }
      throw e;
    }
  }
}
