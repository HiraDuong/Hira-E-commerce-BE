import Merchandise from "../model/MerchandiseModel";
import { Op } from "sequelize";
interface IMerchandiseRepo {
    save(merchandise: Merchandise): Promise<Merchandise>;
    update(merchandise: Merchandise): Promise<Merchandise>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Merchandise | null>;
    findAll(): Promise<Merchandise[]>;
    findByName(name: string): Promise<Merchandise[]>;
    findByShopId(id: string): Promise<Merchandise[]>;
}

export class MerchandiseRepo implements IMerchandiseRepo {
    async save(merchandise: Merchandise): Promise<Merchandise> {
        try {
            return Merchandise.create({
                merchandise_name: merchandise.merchandise_name,
                merchandise_price: merchandise.merchandise_price,
                merchandise_description: merchandise.merchandise_description,
                shop_id: merchandise.shop_id,
                merchandise_in_stock_quantity: merchandise.merchandise_in_stock_quantity,
                merchandise_img: merchandise.merchandise_img
            });
        }
        catch (error) {
            console.error('Error saving merchandise:', error);
            throw error;
        }
    }
    async update(merchandise: Merchandise): Promise<Merchandise> {
        try {
            return merchandise.save();
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Error deleting merchandise:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<Merchandise | null> {
        try{
            return await Merchandise.findByPk(id);
        }
        catch (error) {
            console.error('Error finding merchandise by ID:', error);
            throw error;
        }
    }
    async findAll(): Promise<Merchandise[]> {
        try{
            return await Merchandise.findAll();
        }
        catch (error) {
            console.error('Error finding all merchandises:', error);
            throw error;
        }
    }

    async findByName(name: string): Promise<Merchandise[]> {
        try{
            return await Merchandise.findAll({ where: { merchandise_name: { [Op.iLike]: `%${name}%` } } });
        }
        catch (error) {
            console.error('Error finding merchandises by name:', error);
            throw error;
        }
    }

    async findByShopId(id: string): Promise<Merchandise[]> {
        try{
            return await Merchandise.findAll({ where: { shop_id: id } });
        }
        catch (error) {
            console.error('Error finding merchandises by shop ID:', error);
            throw error;
        }
    }

}