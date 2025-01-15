import * as dotenv from 'dotenv'
dotenv.config()

import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';

const app = express()
const port = process.env.PR_PORT;

const connectionOptions = { 
    type: "postgres",
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: [], // Массив сущностей
    synchronize: true, // Опционально, включите, если хотите синхронизировать схему БД
    logging: true, // Включите для отображения запросов в консоли
};

createConnection(connectionOptions)
  .then(async connection => {
    console.log("Database connected");

    app.use(express.json());

    app.get("/", async (req, res) => {
        res.json("Hello, world!");
    });

    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  })
  .catch(error => console.log("Ошибка:", error));