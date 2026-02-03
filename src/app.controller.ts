import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { EmailRequest } from './models/email.request';


@Controller("notifications")
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('email')
  async sendEmail(@Req() req, @Body() emailRequest: EmailRequest, @Res() res: ExpressResponse) {
     try {
      
      console.log( 'sendEmail - BEGIN',new Date().toLocaleTimeString());
      
      await this.appService.sendEmail(emailRequest);


      console.log( 'sendEmail - END',new Date().toLocaleTimeString());
      return res.json({
        message: "Correo enviado"
      });
     } catch (error) {
        if(error instanceof BadRequestException) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
     }
     
  }
}
