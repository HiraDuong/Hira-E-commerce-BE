import Shop from '../model/ShopModel';
import { Op } from 'sequelize';
interface IShopRepo {
    findById(id: string): Promise<Shop | null>;
    findAll(): Promise<Shop[]>;
    findByUserId(user_id: string): Promise<Shop[]>;
    findByShopName(name: string): Promise<Shop[]>;
    save(shop: Shop): Promise<Shop>;
    update(shop: Shop): Promise<Shop>;
    delete(id: string): Promise<void>;
}

export class ShopRepo implements IShopRepo {
    async findById(id: string): Promise<Shop | null> {
        try {
            return await Shop.findByPk(id);
        } catch (error) {
            console.error('Error finding shop by ID:', error);
            throw error;
        }
    }

    async findAll(): Promise<Shop[]> {
        try {
            return await Shop.findAll();
        } catch (error) {
            console.error('Error finding all shops:', error);
            throw error;
        }
    }

    async findByUserId(user_id: string): Promise<Shop[]> {
        try {
            return await Shop.findAll({
                where: { user_id: user_id }
            });
        } catch (error) {
            console.error('Error finding shops by user ID:', error);
            throw error;
        }
    }

    async findByShopName(name: string): Promise<Shop[]> {
        try {
            return await Shop.findAll({
                where: { shop_name: {
                    [Op.iLike]: `%${name}%`
                }}
            });
        } catch (error) {
            console.error('Error finding shops by name:', error);
            throw error;
        }
    }

    async save(shop: Shop): Promise<Shop> {
        try {
            return await Shop.create(
                {
                    user_id: shop.user_id,
                    shop_name: shop.shop_name,
                    shop_description: shop.shop_description,
                    shop_address: shop.shop_address,
                    shop_avt: shop.shop_avt,
                    shop_start_at: shop.shop_start_at
                }
            );
        } catch (error) {
            console.error('Error creating shop:', error);
            throw error;
        }
    }

    async update(shop: Shop): Promise<Shop> {
        try {
            return await shop.save();
        } catch (error) {
            console.error('Error updating shop:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const shop = await Shop.findByPk(id);
            if (shop) {
                await shop.destroy();
            }
        } catch (error) {
            console.error('Error deleting shop:', error);
            throw error;
        }
    }
}

export default ShopRepo;
