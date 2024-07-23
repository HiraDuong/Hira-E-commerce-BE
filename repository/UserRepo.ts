import { AppUser } from '../model/UserModel';
import { Op } from 'sequelize';
import { ResponseMessage } from '../types/types';
interface IUserRepo {
    save(user: AppUser): Promise<AppUser>;
    findById(id: string): Promise<AppUser | null>;
    findAll(): Promise<AppUser[]>;
    update(user: AppUser): Promise<AppUser>;
    delete(id: string): Promise<void>;
    // add more methods if needed
    check(
        username: string,
        user_telephone: string,
        user_email: string,
    ): Promise<ResponseMessage>;
    findByEmail(email: string): Promise<AppUser | null>;
    findByTelephone(telephone: string): Promise<AppUser | null>;
    findByUsername(username: string): Promise<AppUser | null>;
    findByEmailOrTelephone(
        user_email_or_phone: string,
    ): Promise<AppUser | null>;
}

export class UserRepo implements IUserRepo {
    // save user to database
    async save(user: AppUser): Promise<AppUser> {
        try {
            return await AppUser.create({
                username: user.username!,
                user_email: user.user_email!,
                user_password: user.user_password!,
                user_telephone: user.user_telephone!,
            });
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    // find user by ID
    async findById(id: string): Promise<AppUser | null> {
        try {
            return await AppUser.findByPk(id);
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }
    // find all users
    async findAll(): Promise<AppUser[]> {
        try {
            return await AppUser.findAll();
        } catch (error) {
            console.error('Error finding all users:', error);
            throw error;
        }
    }
    // update user
    async update(user: AppUser): Promise<AppUser> {
        try {
            return await user.save();
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    // delete user
    async delete(id: string): Promise<void> {
        try {
            const user = await AppUser.findByPk(id);
            if (user) {
                await user.destroy();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async check(
        username: string,
        user_telephone: string,
        user_email: string,
    ): Promise<ResponseMessage> {
        try {
            const result = await AppUser.findOne({
                where: {
                    [Op.or]: [
                        { user_telephone: user_telephone },
                        { user_email: user_email },
                        { username: username },
                    ],
                },
            });

            if (result) {
                return {
                    status: 'error',
                    message: 'Username, Telephone or Email already exists!',
                };
            }

            return {
                status: 'success',
                message: 'User can be created!',
            };
        } catch (error) {
            console.error('Error checking user:', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<AppUser | null> {
        try {
            return await AppUser.findOne({ where: { user_email: email } });
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }
    async findByTelephone(telephone: string): Promise<AppUser | null> {
        try {
            return await AppUser.findOne({
                where: { user_telephone: telephone },
            });
        } catch (error) {
            console.error('Error finding user by telephone:', error);
            throw error;
        }
    }
    async findByUsername(username: string): Promise<AppUser | null> {
        try {
            return await AppUser.findOne({ where: { username: username } });
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }
    async findByEmailOrTelephone(
        user_email_or_phone: string,
    ): Promise<AppUser | null> {
        try {
            return await AppUser.findOne({
                where: {
                    [Op.or]: [
                        { user_email: user_email_or_phone },
                        { user_telephone: user_email_or_phone },
                    ],
                },
            });
        } catch (error) {
            console.error('Error finding user by email or telephone:', error);
            throw error;
        }
    }
}
