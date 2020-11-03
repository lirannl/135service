import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import { registerApiRoutes } from "./routes.ts";
const env = Deno.env.toObject();
const CERTPATH = env.CERTPATH;
const KEYPATH = env.KEYPATH;
const HOST = env.HOST || '0.0.0.0';
const PORT = parseInt(env.API_PORT) || 7700;

const app = new Application();

const topLevel = new Router();
registerApiRoutes("/api", topLevel);

app
    .use(oakCors())
    .use(topLevel.routes())
    .use(topLevel.allowedMethods())
    .use(async ctx => {
        await send(ctx, ctx.request.url.pathname, { root: `${Deno.cwd()}/res`, index: "index.html" }).catch(async () => {
            await send(ctx, "index.html", { root: `${Deno.cwd()}/res` });
        });
    });

console.log(`Listening on ${HOST}:${PORT}`);
if (CERTPATH || KEYPATH) await app.listen({
    port: PORT,
    secure: true,
    certFile: CERTPATH,
    keyFile: KEYPATH
});
// If no certificates are specified, don't use https, and assume that the API runnning in development, meaning only localhost should have access
else await app.listen(`localhost:${PORT}`);
