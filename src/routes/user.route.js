import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';
const router = express.Router();



//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

//route to login for user
router.post('/login', userController.login);

//route to forgot password
router.post('/forgot',userController.forgetPassword);

//route to reset password
 router.put('/setpass',authenticate,userController.resetPass);

export default router;
