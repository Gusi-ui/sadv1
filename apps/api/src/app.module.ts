import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TrabajadoraService } from './trabajadora.service';
import { TrabajadoraController } from './trabajadora.controller';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    TrabajadoraController,
    AsignacionController,
    PlanningController,
  ],
  providers: [
    AppService,
    PrismaService,
    TrabajadoraService,
    AsignacionService,
    PlanningService,
  ],
})
export class AppModule {}
