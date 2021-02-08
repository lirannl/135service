import { RouterContext } from "koa-router";
import { readFileSync } from "fs";
import { createHmac } from "crypto";
import { spawn } from "child_process";
import { GithubWebhook } from "../webhook";

const injectPat = (url: string): string => {
    const pat = `${readFileSync(process.env.github_pat_path!)}`;
    return `${/https?:\/\//.exec(url)}lirannl:${pat.trimEnd()}@${/github\.com.*/.exec(url)}`;
}

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
    const involvedFiles = ([] as string[]).concat(...Object.values(summary));
    const updaterArgs = [
        body.repository.clone_url != process.env.own_repo ? injectPat(body.repository.clone_url) : null,
        involvedFiles.some(filePath => filePath.split('/')[0] == "API") ? "api" : null,
        involvedFiles.some(filePath => filePath.split('/')[0] == "webapp") ? "frontend" : null
    ].filter(e => e !== null) as string[]; // Remove nulls
    spawn(process.env.updater_path!, updaterArgs, { detached: true, stdio: "inherit" });;
}

export const update = async (ctx: RouterContext & { request: { body: any } }) => {
    const gitHash = ctx.request.header['x-hub-signature-256'];
    const secret = `${readFileSync(process.env.SECRET!)}`.trimEnd();
    const hmac = createHmac("sha256", secret)
        .update(JSON.stringify(ctx.request.body));
    if (`sha256=${hmac.digest('hex')}` == gitHash) {
        executeUpdate(ctx.request.body);
        ctx.response.status = 200;
    }
    else ctx.response.status = 301;
}