import { Request, Response } from 'express';

import TagRepo from '../repository/TagRepo';
import { CustomRequest } from '../types/types';
class TagController {
    async createTag(req: Request, res: Response) {
        // authenticate admin
        if ((req as CustomRequest).token.user_role.toString() !== 'admin') {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to create a tag!',
            });
        }
        try {
            const tag = await new TagRepo().save(req.body);
            res.status(201).json({
                status: 'Success!',
                message: 'Tag created successfully!',
                data: tag,
            });
        } catch (err) {
            console.error('Error creating tag:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async deleteTag(req: Request, res: Response) {
        // authenticate admin
        if ((req as CustomRequest).token.user_role.toString() !== 'admin') {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to delete a tag!',
            });
        }
        try {
            await new TagRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Success!',
                message: 'Tag deleted successfully!',
            });
        } catch (err) {
            console.error('Error deleting tag:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async getAllTags(req: Request, res: Response) {
        try {
            const tags = await new TagRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched all tags!',
                data: tags,
            });
        } catch (err) {
            console.error('Error fetching tags:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    async getTagByName(req: Request, res: Response) {
        try {
            const tag = await new TagRepo().findByName(req.params.name);
            if (!tag) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Tag not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Tag fetched successfully!',
                data: tag,
            });
        } catch (err) {
            console.error('Error fetching tag:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
}

export default new TagController();
