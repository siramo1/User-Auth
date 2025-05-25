import express from 'express';
import {
    Signup,
    Login,
    VerifyEmail,
    Logout,
    ForgetPassword,
    resetPassword
} from '../controllers/auth.controller.js'

const Router = express.Router();

Router.post('/signup', Signup);
Router.post('/login', Login);
Router.post('/logout', Logout);

Router.post('/verify-email', VerifyEmail);
Router.post('/forget-password', ForgetPassword);
Router.post('/reset-password', resetPassword)

export default Router;