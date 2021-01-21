import { Context } from "https://deno.land/x/oak@v6.3.1/mod.ts";

const subFolderReader = async (subFolder: Deno.DirEntry) => {
  const files = [...Deno.readDirSync(`${Deno.env.toObject().BIN_DIR}/${subFolder.name}`)]
    .filter(f => f.isFile);
  const funcs = files.map(file => file.name.split('.')[0]);
  return await Promise.all(funcs.map(async func => {
    const subProc = Deno.run({
      cmd: [Deno.env.toObject().CODE_BIN, "categorise", func]
      , stdout: "piped"
    });
    return {
      category: new TextDecoder().decode(await subProc.output()).trimEnd(),
      func
    }
  }));
}

// Scan the algorithms folder for algorithms/tools and return their names
// In other words - this returns a list of functions/tools the API should support (however support might not be implemented yet)
export const getFuncs = async function (ctx: Context) {
  const subFolders = [...Deno.readDirSync(Deno.env.toObject().BIN_DIR)]
    .filter(dirEntry => (dirEntry.isDirectory || dirEntry.isSymlink) &&
      !dirEntry.name.startsWith("__"));
  const test = ([] as { category: string, func: string }[])
    .concat(...await Promise.all(subFolders.map(subFolderReader)));
  ctx.response.status = 200;
  ctx.response.body = test;
}