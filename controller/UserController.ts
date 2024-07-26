import { Request, Response } from 'express';
import { AppUser } from '../model/UserModel';
import { UserRepo } from '../repository/UserRepo';
import { CustomRequest } from '../types/types';
import bcrypt from 'bcrypt';
class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const new_user = new AppUser();
            new_user.username = req.body.username!;
            new_user.user_email = req.body.email!;
            new_user.user_password = req.body.password!;
            new_user.user_telephone = req.body.telephone!;
            await new UserRepo().save(new_user);

            res.status(201).json({
                status: 'Created!',
                message: 'Successfully created user!',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    async deleteUser(req: Request, res: Response) {
        // allow admin delete account
        if (
            (req as CustomRequest).token.user_id.toString() !== req.params.id.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to delete this user!',
            });
        }
        try {
            await new UserRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Deleted!',
                message: 'Successfully deleted user!',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    async updateUser(req: Request, res: Response) {
        if ((req as CustomRequest).token.user_id.toString() !== req.params.id) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to update this user!',
            });
        }
        try {
            const updated_user = await new UserRepo().findById(req.params.id);
            if (!updated_user) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'AppUser not found!',
                });
            }
            updated_user.user_email =
                req.body.user_email || updated_user.user_email;
            updated_user.user_avt = req.body.user_avt || updated_user.user_avt;
            updated_user.user_telephone =
                req.body.user_telephone || updated_user.user_telephone;
            if (req.body.password) {
                updated_user.user_password = await bcrypt.hash(
                    req.body.user_password,
                    10,
                );
            } else
                updated_user.user_password =
                    updated_user.user_password.toString();
            const result = await new UserRepo().update(updated_user);

            res.status(200).json({
                status: 'Updated!',
                message: 'Successfully updated user!',
                data: result,
                data_type: 'users',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await new UserRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched users!',
                data: users,
                data_type: 'users',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const user = await new UserRepo().findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'AppUser not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched user!',
                data: user,
                data_type: 'users',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
}

export default new UserController();
