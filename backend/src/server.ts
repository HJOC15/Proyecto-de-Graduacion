import express from "express";
import cors from "cors";
import { sample_foods, sample_users } from "./data";
import jwt from "jsonwebtoken"

const app= express();
app.use(express.json());
app.use(cors());

app.get("/api/productos", (req, res) =>{
    res.send(sample_foods);
})

app.get("/api/productos/:productosId", (req, res) =>{
    const productoId = req.params.productosId;
    const producto = sample_foods.find(producto => producto.id == productoId) 
    res.send(producto)
})

app.post("/api/users/login", (req, res) =>{
    const body = req.body;
    const {email, password} = req.body; 
    const user = sample_users.find(user => user.email === email &&
        user.password === password);

        if(user){
            res.send(generateTokenResponse(user))
        }
        else{
            res.status(400).send("Nombre o contraseña no es válido");
        }

})

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "TextoRandom", {
        expiresIn:"30d"
    });

    user.token = token;
    return user;

}

const port = 5000;
app.listen(port, () => {
    console.log("Corriendo en http://localhost:"+ port);
})
