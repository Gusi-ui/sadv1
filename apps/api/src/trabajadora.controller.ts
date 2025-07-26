import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TrabajadoraService } from './trabajadora.service';
import { CreateTrabajadoraDto, UpdateTrabajadoraDto } from './trabajadora.dto';
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

@ApiTags('trabajadoras')
@ApiBearerAuth()
@Controller('trabajadoras')
@UseGuards(AuthGuard('jwt'))
export class TrabajadoraController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly service: TrabajadoraService,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  @ApiOperation({ summary: 'Crear una nueva trabajadora' })
  @ApiBody({ type: CreateTrabajadoraDto })
  @ApiResponse({ status: 201, description: 'Trabajadora creada correctamente' })
  async create(@Body() data: CreateTrabajadoraDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  async update(@Param('id') id: string, @Body() data: UpdateTrabajadoraDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/asignaciones')
  async getAsignacionesTrabajadora(@Param('id') id: string) {
    return this.prisma.asignacion.findMany({
      where: { trabajadoraId: id },
      include: { usuario: true },
    });
  }

  @Get(':id/planning')
  async getPlanningTrabajadora(@Param('id') id: string) {
    // Buscar todas las asignaciones de la trabajadora
    const asignaciones = await this.prisma.asignacion.findMany({
      where: { trabajadoraId: id },
    });
    const asignacionIds = asignaciones.map((a: { id: string }) => a.id);
    // Buscar todos los planning de esas asignaciones, incluyendo info de asignación y usuario
    return this.prisma.planning.findMany({
      where: { asignacionId: { in: asignacionIds } },
      include: { asignacion: { include: { usuario: true } } },
    });
  }
}
