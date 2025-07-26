import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignacionDto {
  @ApiProperty({
    example: 'uuid-usuario',
    description: 'ID del usuario asignado',
  })
  usuarioId: string;

  @ApiProperty({
    example: 'uuid-trabajadora',
    description: 'ID de la trabajadora asignada',
  })
  trabajadoraId: string;

  @ApiProperty({
    example: '2024-07-24T08:00:00.000Z',
    description: 'Fecha de inicio de la asignación',
  })
  fechaInicio: Date;

  @ApiProperty({
    example: '2024-07-24T16:00:00.000Z',
    description: 'Fecha de fin de la asignación',
    required: false,
  })
  fechaFin?: Date;
}

export class UpdateAsignacionDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  trabajadoraId?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  @ValidateIf(
    (o) =>
      o.fechaFin === undefined ||
      (o.fechaInicio && new Date(o.fechaFin) > new Date(o.fechaInicio)),
  )
  fechaFin?: string;
}
