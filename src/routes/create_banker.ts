import {Router, Request, Response} from 'express';
import { Banker } from '../entities/Bankers';

const router = Router();

router.post('/api/banker', async (req: Request, res: Response) => {

    try {
        const {
            firstName,
            lastName,
            email,
            cardNumber,
            employeeNumber
          } = req.body;
    
        const banker = Banker.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            employee_number: employeeNumber
        });
    
        await banker.save();
    
    
        res.json(banker)
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
});

export {
    router as createBankerRouter
}