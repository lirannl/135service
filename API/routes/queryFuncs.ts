import { Context } from "https://deno.land/x/oak/mod.ts";

export const getFuncs = async function (ctx: Context) {
    const files = [...await Deno.readDirSync(Deno.env.toObject().BIN_DIR)].filter(f=>!f.isDirectory);
    // Only show .py files
    const funcs = files.filter(f=>f.name.split('.')[f.name.split('.').length-1]=='py');

    ctx.response.status = 200;
    // Return filenames without the .py extension
    ctx.response.body = funcs
    .map(f=>f.name.split('.').slice(0, f.name.split('.').length-1).join('.'));
  }