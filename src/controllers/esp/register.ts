import express, { Express, Request, Response, NextFunction } from "express";
import { database } from "../../../database";
import { randomUUID } from "crypto";

export const registerEspInNetwork: Express = express();

registerEspInNetwork.post("/", async (req: Request, res: Response, next: NextFunction) => {

    const { macAddress, userId } = req.body;

    if (!macAddress || !userId) {
        return res.status(400).json({
            message: "Bad Request: macAddress, userId are required!"
        });
    }

    const findUserByUserId = await database.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!findUserByUserId) {
        return res.status(404).json({
            message: "User not found"
        });
    } else {
        try {
            const createdEsp = await database.espressif.create({
                data: {
                    userId,
                    id: randomUUID()
                }
            });

            res.status(200).json
        } catch (error) {
            res.status(500).json(error);
        }
    }


});

