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
        code: HttpStatus.UNAUTHORIZED,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken,process.env.SECRET_CODE, (err, verifiedToken) => {
      if (err) {
        throw {
          code:HttpStatus.UNAUTHORIZED,
          message: 'Token for Authorization is Incorrect'
        };
      }else{
        req.body['data'] = verifiedToken;
        next();
    }
  }
    );
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: 'Authorization token is required'
      };
      bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, verifiedToken) => {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ 
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