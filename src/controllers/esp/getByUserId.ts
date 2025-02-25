import express, { Express, Request, Response } from "express";
import { database } from "../../../database";

export const getSensorByUserId: Express = express();

getSensorByUserId.get("/id/user/:user_id", async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    try {
        if (!userId) {

            res.status(400).json({
                message: "user_id is required"
            });

        } else {

            const data = await database.espressif.findMany({
                where: { userId },
            });

            if (data.length === 0 || data === undefined) {

                res.status(404).json({ message: "No data found" });

            } else {

                res.status(200).json(data);

            }
        }
    } catch (error) {

        res.status(500).json(error);

    }
});
