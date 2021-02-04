import { RouterContext } from "https://deno.land/x/oak@v6.3.1/router.ts";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";
import { GithubWebhook } from "../webhook.ts";

const executeUpdate = (body: GithubWebhook) => {
    Deno.run({cmd: [Deno.env.get("updater_path")!, '&', "disown"]});
}

export const update = async (ctx: RouterContext) => {
    const body = await ctx.request.body().value as GithubWebhook;
    const gitHash = ctx.request.headers.get('X-Hub-Signature-256');
    const secret = Deno.readTextFileSync(Deno.env.get('SECRET')!).trimEnd();
    const bodyHash = hmac('sha256', secret, JSON.stringify(body), undefined, 'hex');
    if (`sha256=${bodyHash}` === gitHash)
    {
        executeUpdate(body);
        ctx.response.status = 200;
    }
    else ctx.response.status = 401;
}