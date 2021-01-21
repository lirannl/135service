export const spawnProgram = (algorithm: string, mode: string, ...extras: string[]) => Deno.run({
    cmd: [Deno.env.toObject().CODE_BIN, mode, algorithm].concat(extras),
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
    cwd: Deno.env.toObject().BIN_DIR
});