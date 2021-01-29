export const spawnProgram = (algorithm: string, mode: string) => Deno.run({
    cmd: [Deno.env.toObject().CODE_BIN, mode, algorithm],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
});