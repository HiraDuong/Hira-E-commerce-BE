import { Op } from 'sequelize';
import Tag from '../model/TagModel';
import Merchandise from '../model/MerchandiseModel';

interface ITagRepo {
    save(tag: Tag): Promise<Tag>;
    update(tag: Tag): Promise<Tag>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Tag[]>;
    findById(id: string): Promise<Tag | null>;
    findByName(name: string): Promise<Tag | null>;
}

export class TagRepo implements ITagRepo {
    findAll(): Promise<Tag[]> {
        try {
            return Tag.findAll();
        } catch (error) {
            console.error('Error finding all tags:', error);
            throw error;
        }
    }
    async save(tag: Tag): Promise<Tag> {
        try {
            return Tag.create({
                tag_name: tag.tag_name.toLowerCase(),
            });
        } catch (error) {
            console.error('Error saving tag:', error);
            throw error;
        }
    }
    async update(tag: Tag): Promise<Tag> {
        try {
            return tag.save();
        } catch (error) {
            console.error('Error updating tag:', error);
            throw error;
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const tag = await Tag.findByPk(id);
            if (tag) {
                await tag.destroy();
            }
        } catch (error) {
            console.error('Error deleting tag:', error);
            throw error;
        }
    }
    async findById(id: string): Promise<Tag | null> {
        try {
            return await Tag.findByPk(id);
        } catch (error) {
            console.error('Error finding tag by ID:', error);
            throw error;
        }
    }
    async findByName(name: string): Promise<Tag | null> {
        try {
            return await Tag.findOne({
                where: { tag_name: { [Op.iLike]: `%${name.toLowerCase()}` } },
            });
        } catch (error) {
            console.error('Error finding tag by name:', error);
            throw error;
        }
    }
}

export default TagRepo;
