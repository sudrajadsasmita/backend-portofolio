import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { RepoEnum } from '@prisma/client';

export class UpdateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  technologies: object;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  repoUrl: string;

  @ApiProperty({
    enum: RepoEnum,
    enumName: 'RepoName',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(RepoEnum)
  repoName: RepoEnum;
}
