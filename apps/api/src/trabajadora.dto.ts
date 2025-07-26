import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrabajadoraDto {
  @ApiProperty({ example: 'Ainhoa', description: 'Nombre de la trabajadora' })
  @IsString()
  @Length(2, 50)
  nombre: string;

  @ApiProperty({
    example: 'García',
    description: 'Apellidos de la trabajadora',
  })
  @IsString()
  @Length(2, 50)
  apellidos: string;

  @ApiProperty({
    example: 'ainhoa@example.com',
    description: 'Email de la trabajadora',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678A', description: 'DNI de la trabajadora' })
  @IsString()
  @Length(7, 10)
  dni: string;

  @ApiProperty({
    example: '612345678',
    description: 'Teléfono de la trabajadora',
  })
  @IsString()
  @Matches(/^\d{9}$/)
  telefono: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la trabajadora está activa',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateTrabajadoraDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  apellidos?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(7, 10)
  dni?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{9}$/)
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
