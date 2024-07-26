import { Request, Response } from 'express';
import { ShopRepo } from '../repository/ShopRepo';
import { Shop } from '../model/ShopModel';
import { CustomRequest } from '../types/types';
class ShopController {
    // create shop
    async createShop(req: Request, res: Response) {
        if (
            (req as CustomRequest).token.user_id.toString() !==
            req.body.user_id.toString()
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message:
                    'You are not allowed to create a shop for another user!',
            });
        }
        try {
            const new_shop = new Shop();
            new_shop.shop_name = req.body.shop_name!;
            new_shop.shop_description = req.body.shop_description!;
            new_shop.shop_avt = req.body.shop_avt!;
            new_shop.shop_start_at = req.body.shop_start_at!;
            new_shop.shop_address = req.body.shop_address!;
            new_shop.user_id = req.body.user_id!;

            const result = await new ShopRepo().save(new_shop);

            res.status(201).json({
                status: 'Created!',
                message: 'Successfully created shop!',
                data: result,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // delete shop
    async deleteShop(req: Request, res: Response) {
        if (
            (req as CustomRequest).token.user_id.toString() !==
                req.body.user_id.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message:
                    'You are not allowed to delete a shop for another user!',
            });
        }
        try {
            await new ShopRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Deleted!',
                message: 'Successfully deleted shop!',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // update shop
    async updateShop(req: Request, res: Response) {
        try {
            const updated_shop = await new ShopRepo().findById(req.params.id);
            if (!updated_shop) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Shop not found!',
                });
            }
            // check authorization
            if (
                (req as CustomRequest).token.user_id.toString() !==
                updated_shop.user_id.toString()
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to update this shop!',
                });
            }
            updated_shop.shop_name =
                req.body.shop_name || updated_shop.shop_name;
            updated_shop.shop_description =
                req.body.shop_description || updated_shop.shop_description;
            updated_shop.shop_avt = req.body.shop_avt || updated_shop.shop_avt;
            updated_shop.shop_start_at =
                req.body.shop_start_at || updated_shop.shop_start_at;
            updated_shop.shop_address =
                req.body.shop_address || updated_shop.shop_address;
            const result = await new ShopRepo().update(updated_shop);
            res.status(200).json({
                status: 'Updated!',
                message: 'Successfully updated shop!',
                data: result,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get shop by id
    async getShopById(req: Request, res: Response) {
        try {
            const shop = await new ShopRepo().findById(req.params.id);
            if (!shop) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Shop not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched shop!',
                data: shop,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get all shops by user id
    async getAllShopsByUserId(req: Request, res: Response) {
        if (
            (req as CustomRequest).token.user_id.toString() !== req.params.user_id.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not allowed to view shops for another user!',
            });
        }
        try {
            const shops = await new ShopRepo().findByUserId(req.params.user_id);
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched shops!',
                data: shops,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get all shops by shop name
    async getAllShopsByShopName(req: Request, res: Response) {
        try {
            const shops = await new ShopRepo().findByShopName(
                req.params.shop_name,
            );
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched shops!',
                data: shops,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get all shops
    async getAllShops(req: Request, res: Response) {
        try {
            const shops = await new ShopRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched shops!',
                data: shops,
                data_type: 'shops',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
}

export default new ShopController();
