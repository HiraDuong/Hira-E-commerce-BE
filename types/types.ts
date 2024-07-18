import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface ResponseMessage {
    status: string;
    message: string;
}

export interface CustomRequest extends Request {
    token: {
        user_id: string;
        user_role : string;
        exp:number;
        iat: number;
    }
   }

export interface ErrorMessage extends Error {
    statusCode: number;
    message: string;
    errors?: any;
}