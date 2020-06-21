import { Router }from 'https://deno.land/x/oak/mod.ts';
import { encrypt } from './encrypt.ts';
import { decrypt } from './decrypt.ts';
import { getFuncs } from './queryFuncs.ts';

export const router = new Router();
// Capture and reject empty requests on a given path
function rejectEmpty(path: string) {
    return router.use(path, async (ctx, next) => {
        if (!ctx.request.hasBody)
        {
            ctx.response.status = 400;
            ctx.response.body = {message: "Empty request"}
        }
        else{
            return next(); // Continue
        }
    });
}

rejectEmpty('/encrypt');
router.post('/encrypt', encrypt);
rejectEmpty('/decrypt');
router.post('/decrypt', decrypt);
router.get('/funcs', getFuncs);