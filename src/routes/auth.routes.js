import { Router } from 'express';
import { signIn, signUp, renewToken } from '../controllers/auth.controller';
import { validateToken } from '../middlewares/authJwt';

const router = Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/renewToken', validateToken, renewToken);

export default router;