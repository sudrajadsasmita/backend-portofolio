import { ApiProperty } from '@nestjs/swagger';
import { JobEnum } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: JobEnum,
    enumName: 'JobStatus',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(JobEnum)
  status: JobEnum;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startJob: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endJob: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isCurrent: boolean;
}
