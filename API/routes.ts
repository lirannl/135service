import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { getFuncs } from './routes/queryFuncs.ts';
import { pyInterface } from './routes/interface.ts';
import { update } from "./routes/update.ts";


export const registerApiRoutes = (subroute: string, router: Router) => {
    router.post(`${subroute}/:algorithm`, pyInterface);
    router.get(`${subroute}/funcs`, async ctx => {
        await getFuncs(ctx)
    });
    router.get(`${subroute}/update`, update);
}