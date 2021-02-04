import { RouterContext } from "https://deno.land/x/oak@v6.3.1/router.ts";


export const update = async (ctx: RouterContext) => {
    const body = await ctx.request.body().value;
    console.log(body);
}