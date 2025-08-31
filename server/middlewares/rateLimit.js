import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100, 
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: "Connecion rate litmit reached, try again in 15min.",
  },
});

export default authLimiter