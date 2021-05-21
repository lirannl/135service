import { spawn } from 'child_process';

const filterInternal = (rawErr: Uint8Array) => {
    const err = `${rawErr}`;
    if (!err.startsWith("INTERNAL "))
        return err;
    else console.error(/(?<=INTERNAL )(.*)/.exec(err)![0]);
}

const run = (args: string[], payload?: Object) => new Promise<{ code: number, output: string }>((resolve, reject) => {
    const subProc = spawn(process.env.CODE_BIN!, args, { stdio: "pipe" });

    subProc.stdin.end(JSON.stringify(payload));

    const res = (code: number) => {
        const out = filterInternal(subProc.stdout.read() || subProc.stderr.read());
        if (typeof out != "undefined")
            resolve({ code, output: `${out}`.trimEnd() });
        else reject({ code });
    };
    subProc.on("close", res);
    subProc.on("exit", res);
});

export { run };