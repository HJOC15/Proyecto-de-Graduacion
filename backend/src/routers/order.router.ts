import { Router } from 'express';
import asyncHander from 'express-async-handler';
import multer from 'multer';
import mongoose from 'mongoose';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import auth from '../middlewares/auth.mid';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';


const router = Router();
router.use(auth);

const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage });

const DocumentModel = mongoose.model('Document', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: { type: Buffer, required: true },
    fileName: { type: String, required: true },
  }));


router.post('/create',
asyncHander(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('El carrito esta vacío');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)

router.get('/newOrderForCurrentUser', asyncHander(async (req:any, res) =>{
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
    
}))

router.post('/pay', asyncHander( async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/track/:id', asyncHander( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

router.get('/', asyncHander(async (req:any, res:any) => {
    const allOrders = await OrderModel.find();
    res.send(allOrders);
}));

router.post('/updateStatus/:id', asyncHander(async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    if (!Object.values(OrderStatus).includes(newStatus)) {
        res.status(HTTP_BAD_REQUEST).send('Invalid status value');
        return;
    }

    const order = await OrderModel.findById(id);

    if (!order) {
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.status = newStatus;
    await order.save();

    res.send(order);
}));

router.get('/myOrders', asyncHander(async (req: any, res: any) => {
    const userId = req.user.id;

    const userOrders = await OrderModel.find({ user: userId });
    res.send(userOrders);
}));

router.post('/upload', upload.single('file'), asyncHander(async (req:any, res:any) => {
    if (!req.file) {
      return res.status(HTTP_BAD_REQUEST).send('No se ha seleccionado un archivo.');
    }
  
    const { originalname } = req.file;
    const user = req.user.id;
  
    const document = new DocumentModel({
      user,
      file: req.file.buffer,
      fileName: originalname,
    });
  
    await document.save();
  
    res.send('Documento subido exitosamente.');
  }));

  router.get('/download/:id', asyncHander(async (req:any, res:any) => {
    const { id } = req.params;
  
    try {
      const document = await DocumentModel.findById(id);
  
      if (!document) {
        return res.status(HTTP_BAD_REQUEST).send('Documento no encontrado.');
      }
  
      // Configurar la respuesta HTTP para enviar el archivo al cliente
      res.setHeader('Content-Disposition', `attachment; filename=${document.fileName}`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(document.file);
    } catch (error) {
      console.error('Error al descargar el documento:', error);
      res.status(HTTP_BAD_REQUEST).send('Error al descargar el documento.');
    }
  }));

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

