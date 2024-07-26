import Cart from '../model/CartModel';
import Merchandise from '../model/MerchandiseModel';

interface ICartRepo {
    save(cart: Cart): Promise<Cart>;
    update(cart: Cart): Promise<Cart>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Cart | null>;
    findAll(): Promise<Cart[]>;
    findByUserId(userId: string): Promise<Cart[] | null>;
    findByMerchandiseId(merchandiseId: string): Promise<Cart[]>;
}
export class CartRepo implements ICartRepo {
    async save(cart: Cart): Promise<Cart> {
        try {
            // Tìm kiếm bản ghi hiện tại dựa trên user_id và merchandise_id
            const existingCart = await Cart.findOne({
                where: {
                    user_id: cart.user_id,
                    merchandise_id: cart.merchandise_id,
                },
            });

            if (existingCart) {
                // Nếu bản ghi tồn tại, cập nhật số lượng và thời gian
                existingCart.cart_merchandise_quantity +=
                    cart.cart_merchandise_quantity;
                existingCart.cart_add_merchandise_time =
                    cart.cart_add_merchandise_time;

                await existingCart.save(); // Lưu các thay đổi

                return existingCart;
            } else {
                // Nếu bản ghi không tồn tại, tạo bản ghi mới
                const newCart = await Cart.create({
                    user_id: cart.user_id,
                    merchandise_id: cart.merchandise_id,
                    cart_merchandise_quantity: cart.cart_merchandise_quantity,
                    cart_add_merchandise_time: cart.cart_add_merchandise_time,
                });

                return newCart;
            }
        } catch (error) {
            console.error('Error saving cart:', error);
            throw error;
        }
    }

    async update(cart: Cart): Promise<Cart> {
        try {
            return await cart.save();
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const cart = await Cart.findByPk(id);
            if (cart) {
                await cart.destroy();
            }
        } catch (error) {
            console.error('Error deleting cart:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<Cart | null> {
        try {
            return await Cart.findByPk(id, {
                include: [
                    {
                        model: Merchandise,
                        attributes: [
                            'merchandise_name',
                            'merchandise_price',
                            'merchandise_img',
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding cart by ID:', error);
            throw error;
        }
    }
    async findAll(): Promise<Cart[]> {
        try {
            return await Cart.findAll();
        } catch (error) {
            console.error('Error finding all cart:', error);
            throw error;
        }
    }
    async findByUserId(userId: string): Promise<Cart[] | null> {
        try {
            return await Cart.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Merchandise,
                        attributes: [
                            'merchandise_name',
                            'merchandise_price',
                            'merchandise_img',
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding cart by user ID:', error);
            throw error;
        }
    }
    async findByMerchandiseId(merchandiseId: string): Promise<Cart[]> {
        try {
            return await Cart.findAll({
                where: { merchandise_id: merchandiseId },
                include: [
                    {
                        model: Merchandise,
                        attributes: [
                            'merchandise_name',
                            'merchandise_price',
                            'merchandise_img',
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding cart by merchandise ID:', error);
            throw error;
        }
    }
}
