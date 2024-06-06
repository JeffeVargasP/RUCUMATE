import express, { Express, Request, Response, NextFunction } from "express";
import { database } from "../../../database";

export const createEspData: Express = express();

createEspData.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { sensorId, temperature, humidity, luminosity, userId } = req.body;

    if (!sensorId || !temperature || !humidity || !luminosity || !userId) {
        return res.status(400).json({

            message: "Bad Request: sensorId, temperature, humidity, luminosity, userId are required!"

        });
    }

    try {

        const data = await database.espressif.create({
            data: {
                sensorId,
                temperature,
                humidity,
                luminosity,
                userId,
            
            },
        });
        res.status(200).json(data);

    } catch (error) {

        res.status(500).json(error);

    }
});

