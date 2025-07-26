import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePlanningDto, UpdatePlanningDto } from './planning.dto';

@Injectable()
export class PlanningService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.planning.findMany();
  }

  async findOne(id: string) {
    const planning = await this.prisma.planning.findUnique({ where: { id } });
    if (!planning) throw new NotFoundException('Planning no encontrado');
    return planning;
  }

  async create(data: CreatePlanningDto) {
    // Validar existencia de asignacion
    const asignacion = await this.prisma.asignacion.findUnique({
      where: { id: data.asignacionId },
    });
    if (!asignacion) throw new BadRequestException('Asignación no encontrada');
    // Validar horas
    if (new Date(data.horaFin) <= new Date(data.horaInicio)) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la de inicio',
      );
    }
    return this.prisma.planning.create({
      data: {
        asignacionId: data.asignacionId,
        fecha: new Date(data.fecha),
        horaInicio: new Date(data.horaInicio),
        horaFin: new Date(data.horaFin),
      },
    });
  }

  async update(id: string, data: UpdatePlanningDto) {
    // Validar horas si ambas existen
    if (
      data.horaInicio &&
      data.horaFin &&
      new Date(data.horaFin) <= new Date(data.horaInicio)
    ) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la de inicio',
      );
    }
    // Validar existencia de asignacion si se actualiza
    if (data.asignacionId) {
      const asignacion = await this.prisma.asignacion.findUnique({
        where: { id: data.asignacionId },
      });
      if (!asignacion)
        throw new BadRequestException('Asignación no encontrada');
    }
    try {
      return await this.prisma.planning.update({
        where: { id },
        data: {
          ...data,
          fecha: data.fecha ? new Date(data.fecha) : undefined,
          horaInicio: data.horaInicio ? new Date(data.horaInicio) : undefined,
          horaFin: data.horaFin ? new Date(data.horaFin) : undefined,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Planning no encontrado');
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.planning.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Planning no encontrado');
      }
      throw e;
    }
  }
}
