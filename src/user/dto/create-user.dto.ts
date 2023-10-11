import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dateBirth: string;
}
