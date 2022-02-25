/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

//route to login for user
router.get('/login', userController.login);

//route to get a single user by their user id
router.get('/byId', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/byId', userController.updateUser);

//route to delete a single user by their user id
router.delete('/byId', userController.deleteUser);

export default router;
