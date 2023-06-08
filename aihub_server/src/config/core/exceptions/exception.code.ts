import { HttpStatus } from '@nestjs/common';

export class ExceptionCode {
  constructor(
    private readonly code: string,
    private readonly message: string,
    private readonly status: number,
  ) {}
  getCode = () => this.code;
  getMessage = () => this.message;
  getStatus = () => this.status;
}

export const ExceptionCodeList = {
  SYSTEM: {
    SERVER_ERROR: new ExceptionCode(
      'SERVER_ERROR',
      'Server 오류',
      HttpStatus.INTERNAL_SERVER_ERROR,
    ),
  },
  COMMON: {
    WRONG_REQUEST: new ExceptionCode(
      'WRONG_REQUEST',
      '요청 오류',
      HttpStatus.BAD_REQUEST,
    ),
  },
};
