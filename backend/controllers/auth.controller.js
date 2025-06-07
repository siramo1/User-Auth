import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendForgetEmail, sendResetSuccessEmail, sendVerificationEmail, SendWelcomeEmail } from '../mailtrap/emails.js';

// SIGN UP ENDPOINT
export const Signup = async (req, res) => {
    const { email, password, name} = req.body;
    try {
     if (!email || !password || !name) {
        return res.status(400).json({success: false, message: 'all fields are required'})
    }
    const userAlreadyExists = await  User.findOne({email});
    if (userAlreadyExists) {
        res.status(401).json({success: false, message: 'this email is already exists'})
    };

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User ({
        name,
        password: hashedPassword,
        email,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    // send verification
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({
        success: true,
        user
    });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
};

// VERIFY EMAIL ENDPOINT
export const VerifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()},
        })
        if (!user) {
            res.status(400).json({success: false, message: 'the code is wrong or undefined'})
        };

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await SendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

// LOGOUT ENDPOINT
export const Logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success: true, message: 'logout successfully'})
};

export const Login = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({success: false, message: 'user didn`t find' })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({success: false, message: 'password is wrong' });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
};


// FORGET PASSWORD ENDPOINT
export const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { res.status(400).json({success: false, message: 'user didn`t find'})};

        const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        
        sendForgetEmail(user.email, `${process.env.Client_URL}/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: 'forget password link sent to your email',
            user
        })

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// RESET PASSWORD ENDPOINT
export const resetPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now()}
        });

        if (!user) { res.status(400).json({success: false, message: 'user didn`t find or token expired'})};

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'password changed successfully',
            user
        })
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// CHECK AUTH ENDPOINT
export const CheckAuth = async (req, res) => {
    try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(401).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}

// get all Students
export const AllUsers = async (req,res) =>{
    try {
    const users = await User.find();
    res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// update one user
export const updateUsers = async (req, res) => {
    const {id} = req.params;
    const {email, name} = req.body ;
    
    if(req.userId !== id){ res.status(403).json({success: false, message: 'user  not found'})};
    try {
        const user = await User.findById(id);
        if(!user){ res.status(400).json({success: false, message: 'user didn`t find'}) };
        
        if(email) user.email = email;
        if(name) user.name = name;
        const updatedUser = await user.save();
        res.status(200).json({success: true, messge: 'user updated successfull', updatedUser});
    } catch (error) {
      res.status(500).json({success: false, message: error.message})  
    }
}