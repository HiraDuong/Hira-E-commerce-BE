import { Request, Response } from 'express';
import { CustomRequest } from '../types/types';
import { CartRepo } from '../repository/CartRepo';

class CartController {
    async createCart(req: Request, res: Response) {
        // authen that is true user
        if (
            (req as CustomRequest).token.user_id !== req.body.user_id &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to create a cart!',
            });
        }
        try {
            const cart = await new CartRepo().save(req.body);
            res.status(201).json({
                status: 'Created!',
                message: 'Successfully created cart!',
                data: cart,
            });
        } catch (err) {
            console.error('Error creating cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async updateCart(req: Request, res: Response) {
        try {
            const cart = await new CartRepo().findById(req.params.id);
            if (!cart) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart not found!',
                });
            }
            // authen that is true user
            if (
                (req as CustomRequest).token.user_id !==
                    cart.user_id.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to update this cart!',
                });
            }
            cart.cart_merchandise_quantity = req.body.cart_merchandise_quantity;
            cart.cart_add_merchandise_time = req.body.cart_add_merchandise_time;
            const updatedCart = await new CartRepo().update(cart);
            res.status(200).json({
                status: 'Success!',
                message: 'Cart updated successfully!',
                data: updatedCart,
            });
        } catch (err) {
            console.error('Error updating cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async deleteCart(req: Request, res: Response) {
        try {
            const cart = await new CartRepo().findById(req.params.id);
            if (!cart) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart not found!',
                });
            }
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    cart.user_id.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to delete your own cart!',
                });
            }
            // authen that is true user
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    cart.user_id.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to delete this cart!',
                });
            }
            await new CartRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Success!',
                message: 'Cart deleted successfully!',
            });
        } catch (err) {
            console.error('Error deleting cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }

    async getAllCarts(req: Request, res: Response) {
        try {
            const carts = await new CartRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Carts fetched successfully!',
                data: carts,
            });
        } catch (err) {
            console.error('Error fetching carts:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async getCartById(req: Request, res: Response) {
        try {
            const cart = await new CartRepo().findById(req.params.id);
            if (!cart) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Cart fetched successfully!',
                data: cart,
            });
        } catch (err) {
            console.error('Error fetching cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async getCartByUserId(req: Request, res: Response) {
        try {
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    req.params.userId.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to get this cart!',
                });
            }
            const carts = await new CartRepo().findByUserId(req.params.userId);
            res.status(200).json({
                status: 'Success!',
                message: 'Carts retrieved successfully!',
                data: carts,
            });
        } catch (err) {
            console.error('Error getting cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }

    async getCartByMerchandiseId(req: Request, res: Response) {
        try {
            const carts = await new CartRepo().findByMerchandiseId(
                req.params.merchandiseId,
            );
            res.status(200).json({
                status: 'Success!',
                message: 'Carts retrieved successfully!',
                data: carts,
            });
        } catch (err) {
            console.error('Error getting cart:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
}

export default new CartController();
