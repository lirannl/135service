import { Context } from "https://deno.land/x/oak/mod.ts";
import { spawnProgram } from "../pythonProc.ts";

export const py_interface = async function (ctx: Context, algorithm: string, mode: string) {
  // Resolve the request's body
  const body = await (await ctx.request.body()).value;
  if(typeof body.key !== "string")
  {
    ctx.response.status = 400;
    ctx.response.body = {message: "The provided key must be of type string."};
    return;
  }
  try {(BigInt(body.key))}
  catch (e) {
    ctx.response.status = 400;
    ctx.response.body = {message: "The provided key must be an integer."};
    return;
  }

  // Start the cryptography program
  const proc = spawnProgram(algorithm, mode, body.key);
  // Enter the text
  await proc.stdin?.write(new TextEncoder().encode(body.content));
  await proc.stdin?.close();
  // Define a buffer for error output
  let rawErr: Uint8Array;
  rawErr = new Uint8Array(1000);
  const code = await proc.status();
  // Read error output into the given buffer
  const outLength = await proc.stderr?.read(rawErr);
  proc.stderr?.close();
  // Get the program's output
  const rawOutput = await proc.output();
  const outputString = new TextDecoder().decode(rawOutput);
  ctx.response.status = 200;
  ctx.response.body = {message: outputString};
  if (code.success) {
    ctx.response.status = 200;
    ctx.response.body = {message: outputString};
  }
  else {
    ctx.response.status = 400;
    console.log(new TextDecoder().decode(rawErr.subarray(0, outLength!-1)));
    ctx.response.body = {message: new TextDecoder().decode(rawErr.subarray(0, outLength!-1))};
  }
}