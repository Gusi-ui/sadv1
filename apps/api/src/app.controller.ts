import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {
  IsString,
  IsInt,
  IsBoolean,
  Length,
  Matches,
  Min,
  Max,
} from 'class-validator';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminOnly } from './roles.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

class CreateUsuarioDto {
  @IsString()
  @Length(2, 50)
  nombre: string;

  @IsString()
  @Length(2, 50)
  apellidos: string;

  @IsString()
  @Matches(/^\d{9}$/)
  telefono: string;

  @IsString()
  @Length(7, 10)
  dni: string;

  @IsString()
  @Length(5, 100)
  direccion: string;

  @IsInt()
  @Min(1)
  @Max(300)
  horasMensuales: number;

  @IsBoolean()
  servicioLaborables: boolean;

  @IsBoolean()
  servicioFestivos: boolean;
}
export { CreateUsuarioDto };

@ApiTags('usuarios')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly appService: AppService,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  @Get('usuarios')
  async getUsuarios() {
    return this.appService.getUsuarios();
  }

  @Post('usuarios')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  async createUsuario(@Body() data: CreateUsuarioDto) {
    return this.appService.createUsuario(data);
  }

  @Get('usuarios/:id/asignaciones')
  async getAsignacionesUsuario(@Param('id') id: string) {
    return this.prisma.asignacion.findMany({
      where: { usuarioId: id },
      include: { trabajadora: true },
    });
  }

  @Get('usuarios/:id/planning')
  async getPlanningUsuario(@Param('id') id: string) {
    // Buscar todas las asignaciones del usuario
    const asignaciones = await this.prisma.asignacion.findMany({
      where: { usuarioId: id },
    });
    const asignacionIds = asignaciones.map((a) => a.id);
    // Buscar todos los planning de esas asignaciones, incluyendo info de asignación y trabajadora
    return this.prisma.planning.findMany({
      where: { asignacionId: { in: asignacionIds } },
      include: { asignacion: { include: { trabajadora: true } } },
    });
  }
}
