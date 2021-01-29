import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { getFuncs } from './routes/queryFuncs.ts';
import { py_interface } from './routes/interface.ts';


export const registerApiRoutes = (subroute: string, router: Router) => {
    router.post(`${subroute}/:algorithm`, py_interface);
    router.get(`${subroute}/funcs`, async ctx => {
        await getFuncs(ctx)
    });
}