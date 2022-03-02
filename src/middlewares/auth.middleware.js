import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = myToken.split(' ')[1];

    const { user } = await jwt.verify(bearerToken, 'your-secret-key');
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
      bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, verifiedToken) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
          message: 'Token for Authorization is Incorrect' 
        });
      } else {
        req.body['data'] = verifiedToken;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};