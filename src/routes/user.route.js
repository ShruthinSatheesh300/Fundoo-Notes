import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';
const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

//route to login for user
router.get('/login', userController.login);

//route to forgot password
router.get('/forgot',userController.forgetPassword);

//route to reset password
 router.put('/setpass/:_id',authenticate,userController.resetPass);

export default router;
