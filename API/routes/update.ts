import { RouterContext } from "https://deno.land/x/oak@v6.3.1/router.ts";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";
import { GithubWebhook } from "../webhook.ts";

const injectPat = (url: string): string =>
    `${/https?:\/\//.exec(url)}lirannl:${Deno.env.get("github_pat_path")}@${/github\.com.*/.exec(url)}`;

const executeUpdate = (body: GithubWebhook) => {
    const deltas = body.commits.map(({ added, removed, modified }) => ({ added, removed, modified }));
    const summary = deltas.reduce((acc, curr) => {
        const updated = (prop: keyof typeof deltas[0]) => acc[prop].concat(curr[prop]);
        return {
            added: updated('added'),
            removed: updated('removed'),
            modified: updated('modified')
        }
    }, { added: [], removed: [], modified: [] });
    const updaterArgs = [
        body.repository.clone_url != Deno.env.get('own_repo') ? injectPat(body.repository.clone_url) : null,
    ].filter(e => e !== null) as string[]; // Remove nulls
    Deno.run({ cmd: [Deno.env.get("updater_path")!, ...updaterArgs, '&', "disown"] });
}

export const update = async (ctx: RouterContext) => {
    const body = await ctx.request.body().value as GithubWebhook;
    const gitHash = ctx.request.headers.get('X-Hub-Signature-256');
    const secret = Deno.readTextFileSync(Deno.env.get('SECRET')!).trimEnd();
    const bodyHash = hmac('sha256', secret, JSON.stringify(body), undefined, 'hex');
    if (`sha256=${bodyHash}` === gitHash) {
        ctx.response.status = 200;
        executeUpdate(body);
    }
    else ctx.throw(401);
}