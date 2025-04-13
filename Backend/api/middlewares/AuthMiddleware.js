import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import { jwtSecret } from '../config/jwt.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }
    
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(error);
  }
};