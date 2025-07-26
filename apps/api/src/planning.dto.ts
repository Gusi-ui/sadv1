import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanningDto {
  @ApiProperty({
    example: 'uuid-asignacion',
    description: 'ID de la asignación',
  })
  asignacionId: string;

  @ApiProperty({
    example: '2024-07-24',
    description: 'Fecha del planning (YYYY-MM-DD)',
  })
  fecha: Date;

  @ApiProperty({
    example: '2024-07-24T08:00:00.000Z',
    description: 'Hora de inicio',
  })
  horaInicio: Date;

  @ApiProperty({
    example: '2024-07-24T16:00:00.000Z',
    description: 'Hora de fin',
  })
  horaFin: Date;
}

export class UpdatePlanningDto {
  @IsString()
  asignacionId?: string;

  @IsDateString()
  fecha?: string;

  @IsDateString()
  horaInicio?: string;

  @IsDateString()
  horaFin?: string;
}
