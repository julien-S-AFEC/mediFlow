import sanitizeHtml from 'sanitize-html';

export const sanitizeData = (req, res, next) => {
    try {
        if (!req.body) {
            return next()
        }
        let newBody = {}

        for (let [key, value] of Object.entries(req.body)) {

            if (typeof value != 'string') {
                newBody[key] = value
                continue
            }
            newBody[key] = sanitizeHtml(value)
        }
        req.body = newBody
        next()
    }
    catch (error) {
        return next(error)
    }
}
