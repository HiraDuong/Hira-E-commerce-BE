import { Request, Response } from 'express';
import { UserRepo } from '../repository/UserRepo';
import AppUser from '../model/UserModel';
import bcrypt from 'bcrypt';
import { generateToken, refreshToken } from '../service/JwtService';
import dotenv from 'dotenv';

dotenv.config();

const userRepo = new UserRepo();
class AuthController {
    async register(req: Request, res: Response) {
        const { username, user_email, user_password, user_telephone,role } = req.body;
        try {
            // Check if username or user_email is already in use
            const result = await userRepo.check(username, user_telephone, user_email);
            
            if (result.status === "error") {
                // If username or email already exists, return error response
                return res.status(400).json({
                    status: "error",
                    message: "Username or email is already in use"
                });
            } else {
                // If username and email are unique, proceed to create a new user
                const hashedPassword = await bcrypt.hash(user_password, 10);
                const new_user = new AppUser({
                    username,
                    user_email,
                    user_telephone,
                    user_password: hashedPassword,
                });

                // Save the new user to the database
                const response =  await userRepo.save(new_user);

                // Generate token for user
                const token = generateToken({ 
                    user_id:response.user_id, 
                    user_email:response.user_email, 
                    user_telephone:response.user_telephone, 
                    user_role:response.user_role
                 });
                return res.status(201).json({
                    status: "success",
                    message: "User created successfully",
                    token: token,
                    data : response,
                    data_type: "users"
                });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error"
            });
        }
    }

    async login(req: Request, res: Response) {
        const { user_email_or_phone, user_password } = req.body;
        try {
            // Find user by email or telephone
            const user = await userRepo.findByEmailOrTelephone(user_email_or_phone);
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    type: 'user',
                    message: "User not found"
                });
            }

            // Check if password is correct
            const isPasswordValid = await bcrypt.compare(user_password, user.user_password as string);
            if (!isPasswordValid) {
                return res.status(400).json({
                    status: "error",
                    message: "Wrong password",
                    type: 'password'
                });
            }

            // Generate token for user
            const token = generateToken({ 
                user_id: user.user_id, 
                user_email: user.user_email, 
                user_telephone: user.user_telephone, 
                user_role: user.user_role
            });
            return res.status(200).json({
                status: "success",
                message: "Login successful",
                token: token,
                user:user
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error"
            });
        }
    }
    async refresh(req: Request, res: Response) {
        const { token } = req.body;
        try {
            // Refresh token
            const refreshedToken = refreshToken(token);
            return res.status(200).json({
                status: "success",
                message: "Token refreshed successfully",
                token: refreshedToken
            });
        } catch (error) {
            console.error('Error refreshing token:', error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error"
            });
        }
    }
}

export default new AuthController();
