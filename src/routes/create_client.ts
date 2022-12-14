import {Router, Request, Response} from 'express';
import { Client } from '../entities/Client';

const router = Router();

router.post('/api/client', async (req: Request, res: Response) => {

    const {
        firstName,
        lastName,
        email,
        cardNumber,
        balance
      } = req.body;

    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        card_number: cardNumber,
        balance
    });

    await client.save();


    res.json(client)
});

export {
    router as createClientRouter
}