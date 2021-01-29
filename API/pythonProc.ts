export const spawnProgram = (algorithm: string, mode: string, key: string, extras: string[]) => Deno.run({
    cmd: [Deno.env.toObject().CODE_BIN , mode, key, algorithm].concat(extras),
    stdin: "piped", 
    stdout: "piped",
    stderr: "piped",
});