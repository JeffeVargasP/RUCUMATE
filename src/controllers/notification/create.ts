import express, { Express, Request, Response } from "express";
import { database } from "../../../database";

export const createNotification: Express = express();

createNotification.post("/generate", async (req: Request, res: Response) => {
    const { user_id, content } = req.body;

    try {
        if (!user_id || !content) {
            res.status(400).json({
                message: "user_id and content are required"
            });
        } else {

            const existingNotification = await database.notification.findFirst({
                where: { content }
            });

            if (existingNotification) {
                res.status(200).json({
                    message: "Notification already exists"
                });
            } else {
                const notification = await database.notification.create({
                    data: {
                        userId: user_id,
                        content: content
                    }
                });
                res.status(200).json({
                    notification
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
