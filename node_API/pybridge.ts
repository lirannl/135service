import { spawn } from 'child_process';

const run = (args: string[], payload?: Object) => new Promise<{code: number, output: string}>((resolve, reject) => {
    const subProc = spawn(process.env.CODE_BIN!, args, { stdio: "pipe" });

    subProc.stdin.end(JSON.stringify(payload));

    const res = (code: number) => {
        const out = subProc.stdout.read() || subProc.stderr.read();
        resolve({code, output: `${out}`.trimEnd()});
    };
    subProc.on("close", res);
    subProc.on("exit", res);
});

export { run };