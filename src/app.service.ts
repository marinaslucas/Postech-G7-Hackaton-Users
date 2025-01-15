import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postHello(@Body() body: { teste: number }): string {
    console.log('Hello World!', body.teste);
    console.log('tipo do body', typeof body);
    return 'Hello World POST!';
  }
}
