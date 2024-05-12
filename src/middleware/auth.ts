import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { config } from '../config';


function authenticate(req: any, res: any, next: any) {
    const token = req.headers.authorization;
    const secret = config.secret;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }

        User.findByPk(decoded.id)
            .then((user: any) => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found.' });
                }

                req.user = user;
                next();
            })
            .catch((error: any) => {
                console.error('Error retrieving user:', error);
                res.status(500).json({ message: 'Internal server error.' });
            });
    });
}