import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs'

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) =>{
    const usersCount = await UserModel.countDocuments();
    if(usersCount>0){
        res.send("La semilla funciona");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is Done")

}))

router.post("/login", asyncHandler( async (req, res) =>{
    const body = req.body;
    const {email, password} = req.body; 
    const user = await UserModel.findOne({email})

        if(user && (await bcrypt.compare(password,user.password))){
            console.log(user)
            res.send(generateTokenResponse(user))
            
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("Nombre o contraseña no es válido");
        }

}))

router.post('/register', asyncHandler(
    async (req, res) =>{
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send('El usuario ya existe');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser:User ={
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));

    }
))

const generateTokenResponse = (user:User)=>{
    const token = jwt.sign({ email:user.email, isAdmin:user.isAdmin
    }, "TextoRandom", {
        expiresIn:"30d"
    });

    //const data = {token:token, user}
    return  {
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}

export default router;