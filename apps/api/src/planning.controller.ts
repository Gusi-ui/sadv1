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
import { PlanningService } from './planning.service';
import { CreatePlanningDto, UpdatePlanningDto } from './planning.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminOnly } from './roles.guard';
import { PrismaService } from './prisma.service';

@Controller('planning')
@UseGuards(AuthGuard('jwt'))
export class PlanningController {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly service: PlanningService,
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
  async create(@Body() data: CreatePlanningDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @AdminOnly()
  async update(@Param('id') id: string, @Body() data: UpdatePlanningDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
