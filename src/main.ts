import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { addCspToFile, generateCsp } from "./server/support/csp";
import dotenv from "dotenv";
import { executeRoute } from "./server/newton";
import { ray } from "node-ray";

dotenv.config();

electronReload("server/**/*.js,index.html,main.js,preload.js", {
  electron: `node_modules/electron/dist/Electron.app/Contents/MacOS/Electron`,
  electronArgv: ["--inspect=5858"],
});

const createWindow = () =>
  new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/server/support/preload.js`,
    },
  });

const scaffoldThread = async () => {
  addCspToFile(`${__dirname}/index.html`, generateCsp());

  const win = await createWindow();
  await win.loadFile(`${__dirname}/index.html`);
  win.webContents.openDevTools();
};

app.whenReady().then(async () => {
  ipcMain.handle("newton:navigate", async (event, view) =>
    (await executeRoute(view))()
  );

  /* Runtime */

  await scaffoldThread();
  app.on("activate", () => {
    !BrowserWindow.getAllWindows().length && createWindow();
  });
});

app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});

/* HMR */

if (process.env.NODE_ENV !== "production") {
  const target = `${process.cwd()}/dist/server`;
  const chokidar = require("chokidar");
  const watcher = chokidar.watch(`${target}/**/*.js`);

  ray(`Watching in ${target}`);

  watcher.on("ready", () => {
    watcher.on("all", () => {
      ray(`Changes detected, reloading...`);

      const matches = Object.keys(require.cache).filter((id) =>
        id.includes(target)
      );
      matches.forEach((id) => delete require.cache[id]);

      ray(`Cleared ${matches.length} modules`);
    });
  });
}
