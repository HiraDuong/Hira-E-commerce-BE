import { model, now } from 'mongoose';
import Bill from '../model/BillModel';
import UserOrder from '../model/OrderModel';
import Merchandise from '../model/MerchandiseModel';
interface IBillRepo {
    save(bill: Bill): Promise<Bill>;
    update(bill: Bill): Promise<Bill>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Bill | null>;
    findAll(): Promise<Bill[]>;
    findByUserId(userId: string): Promise<Bill[]>;
}

export class BillRepo implements IBillRepo {
    async save(bill: Bill): Promise<Bill> {
        try {
            return await Bill.create({
                user_id: bill.user_id,
            });
        } catch (error) {
            console.error('Error creating bill:', error);
            throw error;
        }
    }
    async update(bill: Bill): Promise<Bill> {
        try {
            return await bill.save();
        } catch (error) {
            console.error('Error updating bill:', error);
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const bill = await Bill.findByPk(id);
            if (bill) {
                await bill.destroy();
            }
        } catch (error) {
            console.error('Error deleting bill:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<Bill | null> {
        try {
            return await Bill.findByPk(id, {
                include: [
                    {
                        model: UserOrder,
                        attributes: ['order_id', 'order_merchandise_quantity'],
                        include: [
                            {
                                model: Merchandise,
                                attributes: [
                                    'merchandise_id',
                                    'merchandise_name',
                                    'merchandise_price',
                                    'merchandise_img',
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding bill by ID:', error);
            throw error;
        }
    }
    async findAll(): Promise<Bill[]> {
        try {
            return await Bill.findAll({
                include: [
                    {
                        model: UserOrder,
                        attributes: ['order_id', 'order_merchandise_quantity'],
                        include: [
                            {
                                model: Merchandise,
                                attributes: [
                                    'merchandise_id',
                                    'merchandise_name',
                                    'merchandise_price',
                                    'merchandise_img',
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding all bills:', error);
            throw error;
        }
    }
    async findByUserId(userId: string): Promise<Bill[]> {
        try {
            return await Bill.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: UserOrder,
                        attributes: ['order_id', 'order_merchandise_quantity'],
                        include: [
                            {
                                model: Merchandise,
                                attributes: [
                                    'merchandise_id',
                                    'merchandise_name',
                                    'merchandise_price',
                                    'merchandise_img',
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding bills by user ID:', error);
            throw error;
        }
    }
}
