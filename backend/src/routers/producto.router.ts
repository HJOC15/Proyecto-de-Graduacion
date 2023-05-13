import {Router} from 'express';
import { sample_foods, sample_users } from '../data';
import asyncHandler from 'express-async-handler'
import { ProductoModel } from '../models/producto.model';

const router =Router()

router.get("/seed", asyncHandler(
    async (req, res) =>{
    const productoCount = await ProductoModel.countDocuments();
    if(productoCount>0){
        res.send("La semilla funciona");
        return;
    }
    await ProductoModel.create(sample_foods);
    res.send("Seed is Done")

}))

router.get("/",  asyncHandler(async (req, res) =>{
    const producto = await ProductoModel.find()
    res.send(producto);
}))

router.get("/:productosId", asyncHandler(async (req, res) =>{
    const producto = await ProductoModel.findById(req.params.productosId)
    res.send(producto)
}))

export default router;



