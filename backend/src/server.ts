import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import productoRouter from './routers/producto.router';
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
dbConnect();

const app= express();
app.use(express.json());
app.use(cors());

app.use("/api/productos", productoRouter);
app.use("/api/users", userRouter)

const port = 5000;
app.listen(port, () => {
    console.log("Corriendo en http://localhost:"+ port);
})
