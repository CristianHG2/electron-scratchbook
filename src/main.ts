import {app, BrowserWindow, ipcMain} from 'electron';
import electronReload from 'electron-reload';
import {addCspToFile, generateCsp} from './server/lib/csp';
import {Route} from './server/lib/newton';

electronReload('server/**/*.js,index.html,main.js,preload.js', {
  electron:`node_modules/electron/dist/Electron.app/Contents/MacOS/Electron`,
  electronArgv: ['--inspect=5858'],
});

const createWindow = () =>
  new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  })

const scaffoldThread = async () => {
  addCspToFile(`${__dirname}/index.html`, generateCsp());

  const win = (await createWindow());
  await win.loadFile(`${__dirname}/index.html`);
  win.webContents.openDevTools();
};

const executeRoute = async (view: string) => {
  const directory = view.split('/');
  const target = directory.pop() ?? view;

  const routes: Route[] = (await import(`./server/routes/${(directory ?? []).join('/')}/index`)).default;
  return routes.find(route => route.view === target)?.action ?? (() => ({__newton_error: true}));
};

app.whenReady().then(async () => {
  ipcMain.handle('newton:navigate', async (event, view) =>
    (await executeRoute(view))()
  );

  /* Runtime */

  await scaffoldThread();
  app.on('activate', () => {
    !BrowserWindow.getAllWindows().length && createWindow()
  });
});

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
});
