import Merchandise from '../model/MerchandiseModel';
import { Op } from 'sequelize';
import Tag from '../model/TagModel';
import Shop from '../model/ShopModel';
interface IMerchandiseRepo {
    save(merchandise: Merchandise): Promise<Merchandise>;
    update(merchandise: Merchandise): Promise<Merchandise>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Merchandise | null>;
    findAll(): Promise<Merchandise[]>;
    findByName(name: string): Promise<Merchandise[]>;
    findByShopId(id: string): Promise<Merchandise[]>;
    findByTagId(id: string): Promise<Merchandise[]>;
}

export class MerchandiseRepo implements IMerchandiseRepo {
    async save(merchandise: Merchandise): Promise<Merchandise> {
        try {
            return await Merchandise.create({
                merchandise_name: merchandise.merchandise_name,
                merchandise_price: merchandise.merchandise_price,
                merchandise_description: merchandise.merchandise_description,
                shop_id: merchandise.shop_id,
                merchandise_in_stock_quantity:
                    merchandise.merchandise_in_stock_quantity,
                merchandise_img: merchandise.merchandise_img,
            });
        } catch (error) {
            console.error('Error saving merchandise:', error);
            throw error;
        }
    }
    async update(merchandise: Merchandise): Promise<Merchandise> {
        try {
            return await merchandise.save();
        } catch (error) {
            console.error('Error updating merchandise:', error);
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const merchandise = await Merchandise.findByPk(id);
            if (merchandise) {
                await merchandise.destroy();
            }
        } catch (error) {
            console.error('Error deleting merchandise:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<Merchandise | null> {
        try {
            const merchandise = await Merchandise.findByPk(id, {
                include: [
                    {
                        model: Shop,
                        attributes: ['shop_name'],
                    },
                    {
                        model: Tag,
                        through: {
                            attributes: [],
                        },
                        attributes: ['tag_name'],
                    },
                ],
            });
            if (!merchandise) {
                return null;
            }

            return merchandise;
        } catch (error) {
            console.error('Error finding merchandise by ID:', error);
            throw error;
        }
    }
    async findAll(): Promise<Merchandise[]> {
        try {
            return await Merchandise.findAll({
                include: [
                    {
                        model: Shop,
                        attributes: ['shop_name'],
                    },
                    {
                        model: Tag,
                        through: {
                            attributes: [],
                        },
                        attributes: ['tag_name'],
                    },
                ],
            });
        } catch (error) {
            console.error('Error finding all merchandises:', error);
            throw error;
        }
    }

    async findByName(name: string): Promise<Merchandise[]> {
        try {
            return await Merchandise.findAll({
                include: [
                    { model: Shop, attributes: ['shop_name'] },
                    {
                        model: Tag,
                        through: {
                            attributes: [],
                        },
                        attributes: ['tag_name'],
                    },
                ],
                where: { merchandise_name: { [Op.iLike]: `%${name}%` } },
            });
        } catch (error) {
            console.error('Error finding merchandises by name:', error);
            throw error;
        }
    }

    async findByShopId(id: string): Promise<Merchandise[]> {
        try {
            return await Merchandise.findAll({
                include: [
                    { model: Shop, attributes: ['shop_name'] },
                    {
                        model: Tag,
                        through: {
                            attributes: [],
                        },
                        attributes: ['tag_name'],
                    },
                ],
                where: { shop_id: id },
            });
        } catch (error) {
            console.error('Error finding merchandises by shop ID:', error);
            throw error;
        }
    }
    findByTagId(id: string): Promise<Merchandise[]> {
        return Merchandise.findAll({
            include: [
                { model: Tag, where: { tag_id: id } },
                { include: [{ model: Shop, attributes: ['shop_name'] }] },
            ],
        });
    }
}
