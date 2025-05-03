import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import { jwtSecret, jwtExpiresIn } from '../../config/jwt.js';
import dotenv from 'dotenv';
dotenv.config();


export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    if (await User.findOne({ email })) {
      throw new ApiError(400, 'Email already in use');
    }

    const user = await User.create({ username, email, password });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: jwtExpiresIn });
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: jwtExpiresIn });
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        favoriteCountries: user.favoriteCountries
      }
    });
  } catch (error) {
    next(error);
  }
};