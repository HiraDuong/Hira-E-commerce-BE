import { Request, Response } from 'express';
import { CustomRequest } from '../types/types';
import { OrderRepo } from '../repository/OrderRepo';
import { now } from 'mongoose';
class OrderController {
    // create a new order
    async createOrder(req: Request, res: Response) {
        // authorization
        if (
            (req as CustomRequest).token.user_id.toString() !==
                req.body.user_id.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to create an order!',
            });
        }
        try {
            const order = await new OrderRepo().save(req.body);
            res.status(201).json({
                status: 'Success!',
                message: 'Order created successfully!',
                data: order,
            });
        } catch (err) {
            console.error('Error creating order:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // update an order
    async updateOrder(req: Request, res: Response) {
        try {
            const order = await new OrderRepo().findById(req.params.id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found!',
                });
            }
            // authorization
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    order.user_id.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to update this order!',
                });
            }
            order.order_merchandise_quantity =
                req.body.order_merchandise_quantity;
            order.order_date = now();
            const updatedOrder = await new OrderRepo().update(order);
            res.status(200).json({
                status: 'Success!',
                message: 'Order updated successfully!',
                data: updatedOrder,
            });
        } catch (err) {
            console.error('Error updating order:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // delete an order
    async deleteOrder(req: Request, res: Response) {
        try {
            const order = await new OrderRepo().findById(req.params.id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found!',
                });
            }
            // authorization
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    order.user_id.toString() &&
                (req as CustomRequest).token.user_role !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to delete this order!',
                });
            }
            await new OrderRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Success!',
                message: 'Order deleted successfully!',
            });
        } catch (err) {
            console.error('Error deleting order:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }

    // get an order by id
    async getOrderById(req: Request, res: Response) {
        try {
            const order = await new OrderRepo().findById(req.params.id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Order fetched successfully!',
                data: order,
            });
        } catch (err) {
            console.error('Error fetching order:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // get all orders
    async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await new OrderRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Orders fetched successfully!',
                data: orders,
            });
        } catch (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // get orders by user id
    async getOrdersByUserId(req: Request, res: Response) {
        // authorization
        if (
            (req as CustomRequest).token.user_id.toString() !==
                req.params.userId.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to view orders for this user!',
            });
        }
        try {
            const order = await new OrderRepo().findByUserId(req.params.userId);
            res.status(200).json({
                status: 'Success!',
                message: 'Orders fetched successfully!',
                data: order,
            });
        } catch (err) {
            console.error('Error fetching orders by user:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // get orders by merchandise id
    async getOrdersByMerchandiseId(req: Request, res: Response) {
        try {
            const order = await new OrderRepo().findByMerchandiseId(
                req.params.merchandiseId,
            );
            res.status(200).json({
                status: 'Success!',
                message: 'Orders fetched successfully!',
                data: order,
            });
        } catch (err) {
            console.error('Error fetching orders by merchandise:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    // get orders by shop id
    async getOrdersByShopId(req: Request, res: Response) {
        try {
            const order = await new OrderRepo().findByShopId(req.params.shopId);
            res.status(200).json({
                status: 'Success!',
                message: 'Orders fetched successfully!',
                data: order,
            });
        } catch (err) {
            console.error('Error fetching orders by shop:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
}

export default new OrderController();
