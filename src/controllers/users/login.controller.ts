import { signAccessToken } from '../../utils/jwt.util';

const Users = require('../../models/users/user.model');

exports.login = async (req: any, res: any) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ user_name: username, pass_word: password });

        if (user) {
            const payload = {
                username: username,
            };
            const accessToken = await signAccessToken(payload);

            res.send({
                message: 'Login success.',
                data: {
                    access_token: accessToken,
                },
            });
        } else {
            res.status(401).send({
                message: 'Invalid username or password.',
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
