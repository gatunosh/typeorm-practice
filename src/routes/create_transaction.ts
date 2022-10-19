import {Router, Request, Response} from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionTypes } from '../entities/Transaction';


const router = Router();

router.post('/api/cliente/:clientId/transaction', async(req: Request, res: Response) => {
    
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOneBy({id: Number(clientId)});

    if (!client) {
        return res.status(404).json({
            msg: "Client Not Found"
        })
    };

    const transaction = Transaction.create({
        amount,
        type,
        client
    });

    await transaction.save();

    const lastBalance = client.balance; 

    if (type === TransactionTypes.DEPOSIT) {
        client.balance += amount;
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance -= amount;
    }

    await client.save();

    res.json({
        msg: 'Transaction was Succesfully',
        lastBalance,
        currentBalance: client.balance
    })

});


export {
    router as createRouterTransaction
}