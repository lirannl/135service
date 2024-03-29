import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static-server';
import cors from '@koa/cors';
import { router } from './router';
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 7700;

const Application = new Koa();

Application
    .use(cors())
    .use(async (ctx, next) => {
        const startTime = Date.now();
        console.log(`Received request addressed to ${ctx.request.url}`);
        await next();
        console.log(`Responded to request in ${Date.now() - startTime}ms (${ctx.response.status})`);
    })
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve({ rootDir: '../webapp/build', notFoundFile: 'index.html' }));

console.log(`API now listening to traffic on port ${port}.`);
Application.listen({ port });
