import { ApiProperty } from "@nestjs/swagger";

export class Auth {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    accessToken: string;
}
