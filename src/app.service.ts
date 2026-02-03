import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { EmailRequest } from './models/email.request';

@Injectable()
export class AppService {

  constructor() {

  }

  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(emailRequest: EmailRequest): Promise<void> {
    try {
      console.log("emailRequest",emailRequest);
      var transporter = nodemailer.createTransport(emailRequest.server);

      let bufferBody = Buffer.from(emailRequest.body, "base64");
      let decodedBody= bufferBody.toString("utf8");
      
      const mailOptions = {
        from: emailRequest.from,
        to: emailRequest.to,
        subject: emailRequest.subject,
        html: decodedBody,
        attachments: emailRequest.attachments
      };

      console.log("mailOptions",mailOptions);

      await transporter.sendMail(mailOptions);

    } catch (error) {
      console.log("sendEmail - Error", error);
      throw error;
    }
  }
}
