import { Router }from 'https://deno.land/x/oak/mod.ts';
import { encrypt } from './encrypt.ts';
import { decrypt } from './decrypt.ts';

export const router = new Router();
// Capture and reject empty requests
router.use(async (ctx, next) => {
    if (!ctx.request.hasBody)
    {
        ctx.response.status = 400;
        ctx.response.body = {message: "Empty request"}
    }
    else{
        return next(); // Continue
    }
});
router.get('/encrypt', encrypt);
router.post('/encrypt', encrypt);
router.get('/decrypt', decrypt);
router.post('/decrypt', decrypt);