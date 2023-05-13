import {Schema, model} from 'mongoose';


export interface Producto{
        id:string;
        name:string;
        price:number;
        tags?: string;
        imageUrl: string;
   
}

export const ProductoSchema = new Schema<Producto>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        imageUrl: {type: String, required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const ProductoModel = model<Producto>('producto', ProductoSchema)