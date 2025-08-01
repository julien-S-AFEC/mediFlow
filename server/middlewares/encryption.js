import { encrypt, decrypt } from "../crypto.js"

export const encryptData = (req, res, next) => {
    try {
        if (!req.body) {
            return next()
        }
        const { created_at, ...fieldsToEncrypt } = req.body

        const newBody = encrypt(fieldsToEncrypt, req.body.created_at, 5)
        req.body = { ...newBody, created_at: created_at }
        next()
    }
    catch (error) {
        return next(error)
    }
}
