import { RouterContext } from "koa-router";
import { readdirSync } from "fs";
import { run } from "../pybridge";
import { withoutNulls } from "../utils";

type func = Readonly<{
    category: string;
    func: string;
}>;
const binDir = process.env.BIN_DIR!;
const emptyArrPromise = new Promise<func[]>(resolve => resolve([]));

const subFolderReader = async (funcsPromise: Promise<func[]>, subFolder: string) => {
    const files = [...readdirSync(`${binDir}/${subFolder}`)
        .filter(entry => {
            try { readdirSync(`${binDir}/${subFolder}/${entry}`); return; }
            catch { return true; }
        })
        .filter(entry => !entry.startsWith('.')) // Ignore hidden files
        .map(entry => entry.split('.')[0])
    ];
    const subfolderFuncs = await Promise.all(files.map(async file => {
        try {
            const { output } = await run(["categorise", file]);
            if (output == "") return null;
            return {
                category: output,
                func: file
            };
        }
        catch {
            return {
                category: "unknown",
                func: file
            };
        }
    }));
    return (await funcsPromise).concat(withoutNulls(subfolderFuncs));
}

// Scan the algorithms folder for algorithms/tools and return their names
// In other words - this returns a list of functions/tools the API should support (however support might not be implemented yet)
export const getFuncs = async function (ctx: RouterContext) {
    const subfolders = readdirSync(binDir)
        .filter(entry => !entry.startsWith("__") && !entry.startsWith("."))
        .filter(entry => {
            try { readdirSync(`${binDir}/${entry}`); return true; }
            catch { return; }
        }, [] as string[]);
    const funcs = subfolders.reduce(subFolderReader, emptyArrPromise);
    ctx.response.body = await funcs;
    ctx.response.status = 200;
}