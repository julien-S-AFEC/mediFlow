import jsonWebToken from 'jsonwebtoken'


export const jwtValidation = (req, res, next) => {
    const SECRET = process.env.JWT_SECRET;
    const token = req.session.user.jwt
    const jwsToken = token && token.split(' ')[1];
    
    if (!jwsToken) { return res.status(401) }

    jsonWebToken.verify(jwsToken, SECRET, (err, user) => {
        if (err) {
            return res.status(402)
        }
        console.log('ok', user)
        next()
    })
}