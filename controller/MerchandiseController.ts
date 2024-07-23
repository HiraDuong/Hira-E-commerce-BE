import { Request, Response } from 'express';
import { CustomRequest } from '../types/types';
import { MerchandiseRepo } from '../repository/MerchandiseRepo';
import Merchandise from '../model/MerchandiseModel';
import ShopRepo from '../repository/ShopRepo';
import Shop from '../model/ShopModel';

class MerchandiseController {
    // create a new merchandise
    async createMerchandise(req: Request, res: Response) {
        try {
            // find user_id by shop_id
            const shop = await new ShopRepo().findById(req.body.shop_id);
            if (!shop) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Shop not found!',
                });
            }

            // check user_id match
            if (
                (req as CustomRequest).token.user_id.toString() !==
                shop.user_id.toString()
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to access this shop!',
                });
            }

            const new_merchandise = new Merchandise();
            (new_merchandise.merchandise_name = req.body.merchandise_name),
                (new_merchandise.merchandise_price =
                    req.body.merchandise_price),
                (new_merchandise.merchandise_description =
                    req.body.merchandise_description || ''),
                (new_merchandise.shop_id = req.body.shop_id),
                (new_merchandise.merchandise_in_stock_quantity =
                    req.body.merchandise_in_stock_quantity),
                (new_merchandise.merchandise_img = req.body.merchandise_img);

            const result = await new MerchandiseRepo().save(new_merchandise);
            res.status(201).json({
                status: 'Success!',
                message: 'Successfully created a new merchandise!',
                data: result,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
        // if user_id is not is not match
    }
    // update merchandise by id
    async updateMerchandiseById(req: Request, res: Response) {
        console.log(req.body.shop_id);
        try {
            // find user_id by shop_id
            const shop = await new Shop(req.body.shop_id);
            if (!shop) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Shop not found!',
                });
            }
            // check user_id match
            if (
                (req as CustomRequest).token.user_id.toString() !==
                shop.user_id.toString()
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to access this shop!',
                });
            }
            const merchandise = await new MerchandiseRepo().findById(
                req.params.id,
            );
            if (!merchandise) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandise not found!',
                });
            }
            (merchandise.merchandise_name =
                req.body.merchandise_name || merchandise.merchandise_name),
                (merchandise.merchandise_price =
                    req.body.merchandise_price ||
                    merchandise.merchandise_price),
                (merchandise.merchandise_description =
                    req.body.merchandise_description ||
                    merchandise.merchandise_description),
                (merchandise.merchandise_in_stock_quantity =
                    req.body.merchandise_in_stock_quantity ||
                    merchandise.merchandise_in_stock_quantity),
                (merchandise.merchandise_img =
                    req.body.merchandise_img || merchandise.merchandise_img);
            const result = await new MerchandiseRepo().update(merchandise);
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully updated the merchandise!',
                data: result,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // delete merchandise by id
    async deleteMerchandiseById(req: Request, res: Response) {
        try {
            // find user_id by shop_id
            const shop = await new ShopRepo().findById(req.body.shop_id);
            if (!shop) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Shop not found!',
                });
            }
            // check user_id match
            if (
                (req as CustomRequest).token.user_id.toString() !==
                    shop.user_id.toString() &&
                (req as CustomRequest).token.user_role.toString() !== 'admin'
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to access this shop!',
                });
            }
            const merchandise = await new MerchandiseRepo().findById(
                req.params.id,
            );
            if (!merchandise) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandise not found!',
                });
            }
            await new MerchandiseRepo().delete(req.params.id);
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully deleted the merchandise!',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get all merchandises
    async getAllMerchandises(req: Request, res: Response) {
        try {
            const merchandises = await new MerchandiseRepo().findAll();
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully retrieved all merchandises!',
                data: merchandises,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get merchandise by shop id
    async getMerchandiseByShopId(req: Request, res: Response) {
        try {
            const merchandises = await new MerchandiseRepo().findByShopId(
                req.params.shop_id,
            );
            if (merchandises.length === 0) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandises not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully retrieved merchandises by shop id!',
                data: merchandises,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get merchandise by id
    async getMerchandiseById(req: Request, res: Response) {
        try {
            const merchandise = await new MerchandiseRepo().findById(
                req.params.id,
            );
            if (!merchandise) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandise not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully retrieved the merchandise!',
                data: merchandise,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get merchandise by name
    async getMerchandiseByName(req: Request, res: Response) {
        try {
            const merchandises = await new MerchandiseRepo().findByName(
                req.params.name,
            );
            if (merchandises.length === 0) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandises not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully retrieved merchandises by name!',
                data: merchandises,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
    // get merchandise by tag name
    async getMerchandiseByTagId(req: Request, res: Response) {
        try {
            const merchandises = await new MerchandiseRepo().findByTagId(
                req.params.tag_id,
            );
            if (merchandises.length === 0) {
                return res.status(404).json({
                    status: 'Not Found!',
                    message: 'Merchandises not found!',
                });
            }
            res.status(200).json({
                status: 'Success!',
                message: 'Successfully retrieved merchandises by tag name!',
                data: merchandises,
                data_type: 'merchandises',
            });
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: 'Internal Server Error!',
            });
        }
    }
}

export default new MerchandiseController();
