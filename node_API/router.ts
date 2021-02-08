import Router from 'koa-router';
import { getFuncs } from './routes/getFuncs';
import { pyInterface } from './routes/interface';
import { update } from './routes/update';

export const router = new Router({ prefix: '/api' });

router
    .get("/funcs", getFuncs)
    .post("/update", (ctx: any) => update(ctx))
    .post("/:algorithm", (ctx: any) => pyInterface(ctx))
    .use("/", ctx => { ctx.response.status = 404; ctx.response.body = "No such API route." })
    ;