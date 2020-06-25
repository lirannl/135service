export const spawnProgram = (operation: string, mode: string, key: string) => Deno.run({
    cmd: [Deno.env.toObject().CODE_BIN , mode, key], 
    stdin:"piped", 
    stdout:"piped",
    stderr: "piped",
});