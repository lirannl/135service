export const spawnProgram = (algorithm: string, mode: string, key: string) => Deno.run({
    cmd: [Deno.env.toObject().CODE_BIN , mode, key, algorithm], 
    stdin:"piped", 
    stdout:"piped",
    stderr: "piped",
});