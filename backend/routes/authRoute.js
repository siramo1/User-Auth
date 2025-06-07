import express from 'express';
import {
    Signup,
    Login,
    VerifyEmail,
    Logout,
    ForgetPassword,
    resetPassword,
    CheckAuth,
    AllUsers,
    updateUsers
} from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js';

const Router = express.Router();

Router.get('/all-users', AllUsers);
Router.put('/update-users/:id', verifyToken ,updateUsers)

Router.get('/check-auth', verifyToken, CheckAuth);

Router.post('/signup', Signup);
Router.post('/login', Login);
Router.post('/logout', Logout);

Router.post('/verify-email', VerifyEmail);
Router.post('/forget-password', ForgetPassword);
Router.post('/reset-password/:token', resetPassword)

export default Router;