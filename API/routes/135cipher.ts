import { Context, Router } from "https://deno.land/x/oak/mod.ts";
import { py_interface } from './interface.ts';

export default async function(ctx: Context)
{
    const body = await (await ctx.request.body()).value;
    switch (body.operation) {
        case "encrypt":
            return py_interface(ctx, "cipher135", "-e");
    
        case "decrypt":
            return py_interface(ctx, "cipher135", "-d");
            
        default:
            ctx.response.status = 400;
            ctx.response.body = "No operation specified for algorithm 135cipher.";
            break;
    }
}