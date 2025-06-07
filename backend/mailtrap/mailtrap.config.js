// emailClient.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();


const resendApiKey = process.env.RESEND_API_KEY;


export const resendClient = new Resend(resendApiKey);


export const sender = {
  email: 'onboarding@resend.dev', 
  name:  'Bilal',
};
