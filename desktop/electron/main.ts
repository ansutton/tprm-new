import { app, BrowserWindow } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as cp from 'node:child_process';
import path from 'node:path';
// import * as terminate from 'terminate'

let childProcess: cp.ChildProcess
let children: Array<cp.ChildProcess> = []
const devEnvPathToAppServer = '\\..\\..\\server\\dist\\tprm_accelerator\\app.exe'
const prodEnvPathToAppServer = `\\tprm_accelerator\\app.exe`

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'favicon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    });

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send(
            'main-process-message',
            new Date().toLocaleString(),
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'));
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // if (childProcess) {
        //     childProcess.stdout?.destroy()
        //     childProcess.stdin?.destroy()
        //     childProcess.stderr?.destroy()
        //     // terminate.default(childProcess.pid ?? 0, err => console.log(err))
        //     // childProcess.kill('SIGINT')
        //     // childProcess.kill('SIGTERM')
        //     childProcess.kill()

        //     // setTimeout(() => {
        //     //     childProcess.kill('SIGINT');
        //     // }, 2000);
        // }
        app.quit();
        win = null;
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    createWindow()
    console.log("hello from electron")
    // console.log(__dirname)
    childProcess = cp.spawn(`${__dirname}\\..\\..\\server\\dist\\tprm_accelerator\\app.exe`) //(error, stdout, stderr) => {
    children.push(childProcess)
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //       return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.error(`stderr: ${stderr}`);
    //   }); //, { shell: true, detached: true })
});

process.on('exit', function() {
    cp.exec('taskkill /F /T /PID ' + process.pid)
    // console.log('killing', children.length, 'child processes');
    // children.forEach(function(child) {
    //   child.kill();
    // });
  });