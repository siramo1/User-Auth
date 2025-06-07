import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDb } from './db/connectDb.js';
import authRouter from './routes/authRoute.js';

const app = express();
const router = express.Router();

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5174',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
dotenv.config();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello")
});

app.use('/api/auth', authRouter)

const port = process.env.PORT;
app.listen(port, () => {
    connectDb();
    if(port) {
        console.log(`connected to localhost: ${port}`)
    }
    else{
        console.log(`can not connect`)
    }
})