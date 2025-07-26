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
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto, UpdateAsignacionDto } from './asignacion.dto';
import { PrismaService } from './prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminOnly } from './roles.guard';

@Controller('asignaciones')
@UseGuards(AuthGuard('jwt'))
export class AsignacionController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly service: AsignacionService,
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

  @Get(':id/planning')
  async getPlanningAsignacion(@Param('id') id: string) {
    return this.prisma.planning.findMany({ where: { asignacionId: id } });
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  async create(@Body() data: CreateAsignacionDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  async update(@Param('id') id: string, @Body() data: UpdateAsignacionDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
