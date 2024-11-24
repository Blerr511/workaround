import { BadRequestException } from '@nestjs/common';

export class SeatIsNotAvailableException extends BadRequestException {
  constructor() {
    super('Seat is not available');
  }
}
