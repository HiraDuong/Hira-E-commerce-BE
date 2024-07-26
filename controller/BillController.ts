import { Response, Request } from 'express';
import { CustomRequest } from '../types/types';
import Bill from '../model/BillModel';
import { now } from 'mongoose';
import { BillRepo } from '../repository/BillRepo';
class BillController {
    // create bill
    async createBill(req: Request, res: Response) {
        // authenticate
        if (
            (req as CustomRequest).token.user_id.toString() !==
                req.body.user_id.toString() &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to create a bill!',
            });
        }

        try {
            // logic to create bill
            const newBill = new Bill();
            newBill.user_id = req.body.user_id;
            newBill.bill_created_at = now();
            const result = await new BillRepo().save(newBill);
            return res.status(201).json({
                status: 'Created!',
                message: 'Successfully created bill!',
                data: result,
            });
        } catch (error) {
            console.error('Error creating bill:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while creating the bill!',
            });
        }
    }
    // update bill
    async updateBill(req: Request, res: Response) {
        try {
            // logic to update bill
            const bill = await new BillRepo().findById(req.params.id);
            if (!bill) {
                return res.status(404).json({
                    status: 'Error!',
                    message: 'Bill not found!',
                });
            }
            // authenticate
            if (
                (req as CustomRequest).token.user_id.toString() !==
                bill.user_id.toString()
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to update this bill!',
                });
            }
            bill.bill_created_at = req.body.bill_created_at;
            const updatedBill = await new BillRepo().update(bill);
            return res.status(200).json({
                status: 'Success!',
                message: 'Bill updated successfully!',
                data: updatedBill,
            });
        } catch (error) {
            console.error('Error updating bill:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while updating the bill!',
            });
        }
    }

    // delete bill
    async deleteBill(req: Request, res: Response) {
        try {
            // logic to delete bill
            const bill = await new BillRepo().findById(req.params.id);
            if (!bill) {
                return res.status(404).json({
                    status: 'Error!',
                    message: 'Bill not found!',
                });
            }
            // authenticate
            if (
                (req as CustomRequest).token.user_id.toString() !==
                bill.user_id.toString()
            ) {
                return res.status(403).json({
                    status: 'Forbidden!',
                    message: 'You are not authorized to delete this bill!',
                });
            }
            await new BillRepo().delete(req.params.id);
            return res.status(200).json({
                status: 'Success!',
                message: 'Bill deleted successfully!',
            });
        } catch (error) {
            console.error('Error deleting bill:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while deleting the bill!',
            });
        }
    }
    // get all bills
    async getAllBills(req: Request, res: Response) {
        try {
            const bills = await new BillRepo().findAll();
            return res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched all bills!',
                data: bills,
            });
        } catch (error) {
            console.error('Error fetching bills:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while fetching the bills!',
            });
        }
    }

    async getBillByUserId(req: Request, res: Response) {
        if (
            (req as CustomRequest).token.user_id !== req.params.userId &&
            (req as CustomRequest).token.user_role !== 'admin'
        ) {
            return res.status(403).json({
                status: 'Forbidden!',
                message: 'You are not authorized to get this bill!',
            });
        }
        try {
            const bills = await new BillRepo().findByUserId(req.params.userId);
            return res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched bills by user id!',
                data: bills,
            });
        } catch (error) {
            console.error('Error fetching bills:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while fetching the bills!',
            });
        }
    }
    async getBillById(req: Request, res: Response) {
        try {
            const bill = await new BillRepo().findById(req.params.id);
            if (!bill) {
                return res.status(404).json({
                    status: 'Error!',
                    message: 'Bill not found!',
                });
            }

            return res.status(200).json({
                status: 'Success!',
                message: 'Successfully fetched bill by id!',
                data: bill,
            });
        } catch (error) {
            console.error('Error fetching bill:', error);
            return res.status(500).json({
                status: 'Error!',
                message: 'An error occurred while fetching the bill!',
            });
        }
    }
}

export default new BillController();
