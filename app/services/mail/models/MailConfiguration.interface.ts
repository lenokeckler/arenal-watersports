export interface MailConfiguration {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
  secure: boolean;
  requireTLS: boolean;
}
