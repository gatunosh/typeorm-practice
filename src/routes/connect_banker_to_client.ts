import {Router, Request, Response} from 'express';
import { Banker } from '../entities/Bankers';
import { Client } from '../entities/Client';

const router = Router();

router.post('/api/banker/:bankerId/client/:clientId', async(req: Request, res: Response) => {
    
    const {bankerId, clientId} = req.params;

    const client = await Client.findOneBy({id: Number(clientId)});

    const banker = await Banker.findOne(
        {
            where: {
                id: Number(bankerId)
            },
            relations: ["clients"]
        }
    );

    if (!client || !banker) return res.status(404).json({msg: "Banker or client not found"})

    banker.clients = [
        ...banker.clients,
        client
    ]

    await banker.save();

    return res.json({
        msg: 'Banker connected to client'
    });

});


export {
    router as  connectRouterClientBanker
}