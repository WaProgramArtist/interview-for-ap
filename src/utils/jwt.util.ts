const jsonwebtoken = require('jsonwebtoken');

const secretKey = 'wapower18plus';
const expireDate = 2592000; // one month

const signAccessToken = (payload: any) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(
            {
                account_id: payload.accountId,
                username: payload.username,
                email: payload.email,
                mobile: payload.mobile,
            },
            secretKey,
            { expiresIn: expireDate },
            (err: any, token: any) => {
                if (err) {
                    reject(err);
                }

                const accesstoken = token;
                resolve(accesstoken);
            }
        );
    });
};

const verifyAccessToken = (accessToken: string) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(accessToken, secretKey, (err: any, decoded: any) => {
            if (err) {
                reject(err);
            }

            resolve(decoded);
        });
    });
};

const decodeAccessToken = (accessToken: string) => {
    try {
        const decoded = jsonwebtoken.decode(accessToken, { complete: true });
        return decoded;
    } catch (error) {
        throw error;
    }
};

export { signAccessToken, verifyAccessToken, decodeAccessToken };
