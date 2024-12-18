import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'

/****
 * @SIGNUP
 * @METHOD @post
 * @ROUTE {{URL}}/api/v1/user/register
 * @description signup function is created for the new user 
 */

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is required"
    });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = userModel({
      ...req.body,
      password: hashedPassword
    });

    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


/***
 * @SINGIN
 * @ROUTE {{URL}}/api/v1/user/login
 * @description signin function for the user account
 * @method @POST 
 */

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and Password are required', 400));
  }

  const user = await userModel.findOne({ email }).select('+password');

  // if (!(user && (await user.comparePassword(password)))) {
  //   return next(
  //     new AppError('Email or Password do not match or user does not exist', 401)
  //   );
  // }

  // const token = await user.generateJWTToken();

  // user.password = undefined;

  // res.cookie('token', token, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user,
  });
};
/**
 * @LOGOUT
 * @ROUTE @POST {{URL}}/api/v1/user/logout
 * @ACCESS Public
 */
export const logoutUser = async (_req, res, _next) => {
  res.cookie('token', null, {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 0,
    httpOnly: true,
  });

  // Sending the response
  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

/**
 * @GetUserData
 * @Route @GET {{URL}}/api/v1/user
 * @ACCESS Public 
 */

export const getLoggedInUserDetails = async (req, res, _next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'User is not authenticated',
    });
  }

  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
