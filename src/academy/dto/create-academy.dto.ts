import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAcademyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  school: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  faculty: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gpa: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startStudy: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endStudy: Date;
}
