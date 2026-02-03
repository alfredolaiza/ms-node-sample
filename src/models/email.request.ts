export interface EmailRequest {
    server: {
        host: string,
        port: number,
        secure: boolean,
        auth: {
            user: string,
            pass: string,
        }
    };
    from: string;
    to: string[];
    body: string;
    subject: string;
    attachments: {
        filename: string,
        content: string,
        encoding: string,
        cid: string
      }[]
}