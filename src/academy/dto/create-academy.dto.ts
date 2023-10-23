import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  studyProgram: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gpa: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startStudy: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endStudy: Date;
}
