import { Context } from "https://deno.land/x/oak/mod.ts";
import { py_interface } from "./interface.ts"

export const decrypt = async function (ctx: Context) {
  return py_interface(ctx, "-d");
}