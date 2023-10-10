import { Res, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseJson {
  static success(@Res() res, message: string, data: any): void {
    return res.json({
      status: true,
      message: message,
      data: data,
    });
  }
  static failure(
    @Res() res,
    message: string,
    data: any,
    responseCode: number,
  ): void {
    res.status(responseCode).json({
      status: false,
      message: message,
      data: data,
    });
  }
}
