import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { config } from '../config';

// Routers

import { userRoutes } from './routes/user';
import { espRoutes } from './routes/esp';
import { notificationRoutes } from './routes/notification';


const app: Express = express();
const { serverPort } = config;


// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
    }
    next();
});

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
