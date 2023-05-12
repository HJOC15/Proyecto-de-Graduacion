import express from "express";
import cors from "cors";
import { sample_foods } from "./data";

const app= express();
app.use(cors());

app.get("/api/productos", (req, res) =>{
    res.send(sample_foods);
})

app.get("/api/productos/:productosId", (req, res) =>{
    const productoId = req.params.productosId;
    const producto = sample_foods.find(producto => producto.id == productoId) 
    res.send(producto)
})

const port = 5000;
app.listen(port, () => {
    console.log("Corriendo en http://localhost:"+ port);
})
