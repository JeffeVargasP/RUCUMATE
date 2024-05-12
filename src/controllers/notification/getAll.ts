import express, { Express, Request, Response } from "express";
import { database} from "../../../database";

export const getNotification: Express = express();

getNotification.get("/", async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        if (!userId) {
            res.status(400).json({
                message: "user_id is required"
            });
        } else {

            const notifications = await database.notification.findMany({
                where: {
                    userId
                }
            });

            res.status(200).json({
                notifications
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
