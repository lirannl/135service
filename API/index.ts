import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { router } from "./routes/routes.ts";
const env = Deno.env.toObject();
const CERTPATH = env.CERTPATH;
const KEYPATH = env.KEYPATH;
const HOST = env.HOST || '0.0.0.0'
const PORT = parseInt(env.API_PORT) || 7700

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on ${HOST}:${PORT}`);
await app.listen({
    port: PORT,
    secure: true,
    certFile: CERTPATH,
    keyFile: KEYPATH
});