import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import { apiRouter } from "./routes.ts";
const env = Deno.env.toObject();
const HOST = env.HOST || '0.0.0.0';
const PORT = parseInt(env.API_PORT) || 7700;

const app = new Application();

app
    .use(oakCors())
    .use(async (ctx, next) => {
        const start = Date.now();
        await next();
        console.log(`Received request addressed to ${ctx.request.url
            }, responded (${ctx.response.status}) in ${Date.now() - start}ms`);
    })
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(async ctx => {
        await send(ctx, ctx.request.url.pathname, { root: `${Deno.cwd()}/res`, index: "index.html" }).catch(async () => {
            await send(ctx, "index.html", { root: `${Deno.cwd()}/res` });
        });
    });

console.log(`Now listening for traffic on ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
