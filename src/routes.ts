import express from 'express';
import multer from 'multer';
import uploadConfigMulter from './config/upload';
import AnimalsController from './controllers/AnimalsController';

const routes = express.Router();
const upload = multer(uploadConfigMulter);

routes.post('/animals', upload.array('images') , AnimalsController.create);
routes.get('/animals/:id', AnimalsController.show);
routes.delete('/animals/:id', AnimalsController.delete);
routes.get('/animals', AnimalsController.index);

export default routes;