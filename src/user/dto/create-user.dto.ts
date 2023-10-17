import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { IsUniqueUsername } from 'src/decorator/is_unique.decorator';
import { Match } from 'src/decorator/match.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUniqueUsername({ message: 'Username is not unique' })
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
