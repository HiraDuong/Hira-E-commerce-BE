import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { CustomRequest } from '../types/types';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'this is my secret key :)))))';

// Function to generate a JWT token
export const generateToken = (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};

// Function to decode a JWT token
export const decodeToken = (token: string): any => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        throw error;
    }
};

// Function to check if a token is expired
export const isTokenExpired = (token: string): boolean => {
    const decoded = jwt.decode(token) as JwtPayload;
    if (decoded && decoded.exp) {
        const expiryDate = new Date(decoded.exp * 1000);
        return expiryDate < new Date();
    } else {
        return false;
    }
};

// Function to refresh a token
export const refreshToken = (token: string): string => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (decoded.exp) {
            const expiryDate = new Date(decoded.exp * 1000);
            if (expiryDate > new Date()) {
                return generateToken(decoded);
            } else {
                throw new Error('Token expired, please log in again');
            }
        } else {
            throw new Error('Invalid token, please log in again');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

// Middleware để xác thực token trước khi xử lý yêu cầu
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401).json({
            status: 'error',
            message: 'Token is required',
        }); // Unauthorized
    }

    try {
        // Xác minh tính hợp lệ của token
        const decodedToken = verifyToken(token);
        (req as CustomRequest).token = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.sendStatus(403).json({
            status: 'error',
            message: 'Invalid token, please log in again',
        }); // Forbidden
    }
};
export const authenticateTokenAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401).json({
            status: 'error',
            message: 'Token is required',
        }); // Unauthorized
    }

    try {
        // Xác minh tính hợp lệ của token
        const decodedToken = verifyToken(token);
        (req as CustomRequest).token = decodedToken;
        if (decodedToken.user_role !== 'admin') {
            return res.sendStatus(403).json({
                status: 'error',
                message: 'Only admin can access this route',
            }); // Forbidden
        }
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.sendStatus(403); // Forbidden
    }
};
