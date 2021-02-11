import { RouterContext } from "koa-router";
import { run } from "../pybridge";

export const pyInterface = async (ctx: RouterContext & { request: { body: any, params: { algorithm: string } } }) => {
    if (!ctx.request.body.operation) {
        ctx.response.body = "No operation specified";
        ctx.response.status = 400;
        return;
    };
    const args = ctx.request.body.args;
    try {
        const { code, output } = await run([ctx.request.body.operation, ctx.request.params.algorithm], args);
        if (code == 0) ctx.response.status = 200;
        else ctx.response.status = 400;
        ctx.response.body = { message: output };
    }
    catch {
        ctx.response.status = 500;
    }
}