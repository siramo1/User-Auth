import{ MailtrapClient} from "mailtrap";
import dotenv from 'dotenv';

dotenv.config();

const Token = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({ token: Token });

export const sender = {
  email: "hello@demomailtrap.com",
  name: "bilal",
};