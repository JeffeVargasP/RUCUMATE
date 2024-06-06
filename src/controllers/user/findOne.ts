import express, { Express, Request, Response } from 'express';
import { database } from '../../../database';

export const findOne: Express = express();

findOne.get('', async (req: Request, res: Response) => {

    const id = req.params.id;

    const users = await database.user.findUnique({
        where: { id }
    });

    if (!users) {
        return res.status(404).json({ message: 'Users not found' });
    }

    res.status(200).json({
        message: 'Users found',
        users,
    });

});