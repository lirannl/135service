import { RouterContext } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { spawnProgram } from "../pythonProc.ts";

export const pyInterface = async function (ctx: RouterContext) {
  // Resolve the request's body
  const body = await ctx.request.body().value;
  if (!body.operation) {
    ctx.response.status = 400;
    ctx.response.body = `No operation specified for algorithm "${ctx.params.algorithm}".`;
    return;
  }

  // Start the python bridge
  const proc = spawnProgram(ctx.params.algorithm || '', body.operation);
  // Enter the function arguments
  await proc.stdin?.write(new TextEncoder().encode(JSON.stringify(body.args)));
  await proc.stdin?.close();
  // Define a buffer for error output
  const rawErr = new Uint8Array(1000);
  const code = await proc.status();
  // Read error output into the given buffer
  const outLength = await proc.stderr?.read(rawErr);
  proc.stderr?.close();
  // Get the program's output
  const rawOutput = await proc.output();
  const outputString = new TextDecoder().decode(rawOutput);
  if (code.success) {
    ctx.response.status = 200;
    ctx.response.body = { message: outputString };
  }
  else {
    ctx.response.status = 400;
    console.log(new TextDecoder().decode(rawErr.subarray(0, outLength! - 1)));
    ctx.response.body = { message: new TextDecoder().decode(rawErr.subarray(0, outLength! - 1)) };
  }
}