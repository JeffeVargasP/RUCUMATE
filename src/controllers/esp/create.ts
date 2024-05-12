import express, { Express, Request, Response, NextFunction } from "express";
import { database } from "../../../database";

export const createEspData: Express = express();

createEspData.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { sensorId, temperature, humidity, userId } = req.body;

    if (!sensorId || !temperature || !humidity || !userId) {
        return res.status(400).json({

            message: "Bad Request: sensor_id, temperature, humidity, user_id are required!"

        });
    }

    try {

        const data = await database.espressif.create({
            data: {
                sensorId,
                temperature,
                humidity,
                userId,
            
            },
        });
        res.status(200).json(data);

    } catch (error) {

        res.status(500).json(error);

    }
});

