import express from 'express';
import * as loginController from '../controllers/login.js'

const router = express.Router();


router.post('/register', loginController.register);
router.put('/login/:userType', loginController.login);


export {router as loginRouter};