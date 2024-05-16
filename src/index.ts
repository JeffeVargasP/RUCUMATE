import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from '../config';
import cors from 'cors';

// Routers

import { userRoutes } from './routes/user';
import { espRoutes } from './routes/esp';
import { notificationRoutes } from './routes/notification';


const app: Express = express();
const { serverPort } = config;

// Middleware
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept'
}));
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server Status
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    });
});

// Routers
app.use("/user", userRoutes);
app.use("/esp", espRoutes);
app.use("/notification", notificationRoutes);

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});
