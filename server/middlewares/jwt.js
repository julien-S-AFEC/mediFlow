import jsonWebToken from 'jsonwebtoken'

export const jwtValidation = (req, res, next) => {
    const SECRET = process.env.JWT_SECRET;
    if (!req.session.user) {
        return res.status(401).json("The json web token is not valid or expired.")
    }
    const token = req.session.user.jwt
    const jwsToken = token && token.split(' ')[1];
    jsonWebToken.verify(jwsToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json("The json web token is not valid or expired.")
        }
        next()
    })
}