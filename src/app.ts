import { DataSource } from 'typeorm';
import { Banker } from './entities/Bankers';
import { Client } from './entities/Client';
import { Transaction } from './entities/Transaction';

import express from 'express';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { createRouterTransaction } from './routes/create_transaction';
import { connectRouterClientBanker } from './routes/connect_banker_to_client';

const app = express();

const main = async() => {
    const connectDb = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "odoo",
        database: "typeorm",
        entities: [Client, Banker, Transaction],
        synchronize: true
    });

    connectDb.initialize()
            .then(() => {
                console.log("Database has been initialized");
            }).catch((err) => {
                console.log("Error during Data source initialization");
            })
    
    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createRouterTransaction);
    app.use(connectRouterClientBanker);

    app.listen(3000, () => {
        console.log('Running in port', 3000);
    });
}

main();