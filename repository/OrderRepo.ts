import Merchandise from '../model/MerchandiseModel';
import { UserOrder } from '../model/OrderModel';
import Shop from '../model/ShopModel';

interface IOrderRepo {
    save(order: UserOrder): Promise<UserOrder>;
    update(order: UserOrder): Promise<UserOrder>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<UserOrder | null>;
    findAll(): Promise<UserOrder[]>;
    findByUserId(userId: string): Promise<UserOrder[]>;
    findByShopId(shopId: string): Promise<UserOrder[]>;
    findByMerchandiseId(merchandiseId: string): Promise<UserOrder[]>;
    findByBillId(billId: string): Promise<UserOrder[]>;
}

export class OrderRepo implements IOrderRepo {
    async save(order: UserOrder): Promise<UserOrder> {
        try {
            // create new order
            return await UserOrder.create({
                order_date: order.order_date,
                user_id: order.user_id,
                merchandise_id: order.merchandise_id,
                order_merchandise_quantity: order.order_merchandise_quantity,
            });
        } catch (error) {
            console.error('Error saving order:', error);
            throw error;
        }
    }

    async update(order: UserOrder): Promise<UserOrder> {
        try {
            // update existing order
            return await order.save();
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const order = await UserOrder.findByPk(id);
            if (order) {
                await order.destroy();
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<UserOrder | null> {
        try {
            // find order by id
            return await UserOrder.findByPk(id);
        } catch (error) {
            console.error('Error finding order by ID:', error);
            throw error;
        }
    }
    async findAll(): Promise<UserOrder[]> {
        try {
            // find all orders
            return await UserOrder.findAll();
        } catch (error) {
            console.error('Error finding all orders:', error);
            throw error;
        }
    }
    async findByUserId(userId: string): Promise<UserOrder[]> {
        try {
            // find orders by user id
            return await UserOrder.findAll({ where: { user_id: userId } });
        } catch (error) {
            console.error('Error finding orders by user ID:', error);
            throw error;
        }
    }
    async findByShopId(shopId: string): Promise<UserOrder[]> {
        try {
            // find orders by shop id
            return await UserOrder.findAll({
                include: [
                    {
                        model: Merchandise,
                        where: { shop_id: shopId },
                        include: [
                            {
                                model: Shop,
                                attributes: ['shop_name'],
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding orders by shop ID:', error);
            throw error;
        }
    }
    async findByMerchandiseId(merchandiseId: string): Promise<UserOrder[]> {
        try {
            // find orders by merchandise id
            return await UserOrder.findAll({
                where: { merchandise_id: merchandiseId },
            });
        } catch (error) {
            console.error('Error finding orders by merchandise ID:', error);
            throw error;
        }
    }

    async findByBillId(billId: string): Promise<UserOrder[]> {
        try {
            // find orders by bill id
            return await UserOrder.findAll({ where: { bill_id: billId } });
        } catch (error) {
            console.error('Error finding orders by bill ID:', error);
            throw error;
        }
    }
}
