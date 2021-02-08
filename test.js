/*const { spawn } = require("child_process");

const subProc = spawn('/home/liran/Documents/135code/bin/135code', ["encrypt", "135cipher"]);
subProc.on("exit", (code) => {
    console.log(`Finished with code ${code}`);
})
subProc.on("close", code => console.log(`Finished ${code}`));*/

const { spawn } = require('child_process');
const subProc = spawn('/home/liran/Documents/135code/bin/135code', ["encrypt", "135cipher"], { stdio: "pipe" });

subProc.stdin.end(JSON.stringify({ factor: "123", text: "Hello" }));

subProc.stdout.on('data', (data) => {
    const thing = `${data}`;
    console.log(`stdout: ${data}`);
});

subProc.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

subProc.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});