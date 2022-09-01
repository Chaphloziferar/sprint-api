import { Router } from 'express';
import { signIn, signUp, renewUserToken } from '../controllers/auth.controller';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

// router.post('/renew', validateToken, renewUserToken);

export default router;