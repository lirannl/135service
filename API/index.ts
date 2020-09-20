import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { router } from "./routes.ts";
const env = Deno.env.toObject();
const CERTPATH = env.CERTPATH;
const KEYPATH = env.KEYPATH;
const HOST = env.HOST || '0.0.0.0';
const PORT = parseInt(env.API_PORT) || 7700;

const app = new Application();

app.use(oakCors())
    .use(router.routes())
    .use(router.allowedMethods());

console.log(`Listening on ${HOST}:${PORT}`);
if (CERTPATH || KEYPATH) await app.listen({
    port: PORT,
    secure: true,
    certFile: CERTPATH,
    keyFile: KEYPATH
});
// If no certificates are specified, don't use https, and assume that the API runnning in development, meaning only localhost should have access
else await app.listen(`localhost:${PORT}`);
