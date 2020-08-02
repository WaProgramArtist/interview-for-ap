import { verifyAccessToken } from './utils/jwt.util';
const authorization = async (req: any, res: any, next: any) => {
    try {
        const accessToken = await req.headers['authorization'].split(' ')[1];
        const verified = await verifyAccessToken(accessToken);

        if (verified) {
            next();
        } else {
            res.status(401).send({
                message: 'Unauthorized.',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Token error.',
        });
    }
};

module.exports = authorization;
