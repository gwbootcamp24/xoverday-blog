import { Router } from 'express';
import {
    getUsers,getUserWithId
} from '../controller/userController.js';

export const userRouter = Router();

userRouter.route('/').get(getUsers);

userRouter.route('/:id').get(getUserWithId);
