import dotenv from 'dotenv'
import jsonWebToken from 'jsonwebtoken'
dotenv.config()

export const jwtValidation = (req, res, next) => {
    const SECRET = process.env.JWT_SECRET;
    if (!req.session.user) {
        return res.status(402).json("The json web token is not valid or expired.")
    }
    const token = req.session.user.jwt
    const jwsToken = token && token.split(' ')[1];
    jsonWebToken.verify(jwsToken, SECRET, (err, user) => {
        if (err) {
            return res.status(402).json("The json web token is not valid or expired.")
        }
        next()
    })
}