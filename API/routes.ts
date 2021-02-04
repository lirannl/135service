import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import { getFuncs } from './routes/queryFuncs.ts';
import { pyInterface } from './routes/interface.ts';
import { update } from "./routes/update.ts";


export const apiRouter = new Router({ prefix: '/api' });

apiRouter
    .post('/update', update)
    .get('/funcs', getFuncs)
    .post('/:algorithm', pyInterface)
    .use('/', ctx => { ctx.response.status = 404; ctx.response.body = { message: "No such API route." } });