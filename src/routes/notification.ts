import express, { Router } from "express";
import { createNotification } from "../controllers/notification/create";
import { getNotification } from "../controllers/notification/getAll";

export const notificationRoutes: Router = express.Router();

notificationRoutes.use("/", createNotification);
notificationRoutes.use("/", getNotification);
