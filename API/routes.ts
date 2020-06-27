import { Router, Context }from 'https://deno.land/x/oak/mod.ts';
import { getFuncs } from './routes/queryFuncs.ts';
import { py_interface } from './routes/interface.ts';

export const router = new Router();
router.post('/:algorithm', py_interface);
router.get('/funcs', getFuncs);