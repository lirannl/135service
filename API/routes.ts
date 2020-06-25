import { Router, Context }from 'https://deno.land/x/oak/mod.ts';
import { getFuncs } from './routes/queryFuncs.ts';

export const router = new Router();
export function rejectEmpty(path: string) {
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
// Capture and reject empty requests on a given path
import cipher135 from './routes/135cipher.ts'
router.post('/135cipher', cipher135);
router.get('/funcs', getFuncs);