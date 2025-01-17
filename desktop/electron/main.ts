import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import * as dotenv from 'dotenv';
import * as cp from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppLogger } from './utils/app-logger';

dotenv.config({ path: 'env_configs/.env' });

/**
 * Dev Mode and Paths Configuration
 */
const isDevMode = process.env.IS_DEV_MODE === 'true';
// Log Path
const appLoggerLogPath = '../../logs';
// Misc
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, '..');
// Build Directory Structure
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

var cleanExit = function () {
    process.exit();
};
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

    win.maximize();

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

app.setAppLogsPath(`${__dirname}/${appLoggerLogPath}`);

app.whenReady().then(() => {
    createWindow();
    const createWindowMessage =
        '***** NEW INSTANCE OF TPRM ACCELERATOR OPENED *****';
    AppLogger.instance.writeInfo(createWindowMessage);
    AppLogger.instance.writeError(createWindowMessage);

    // Don't kick off child processes if isDevMode = false.
    if (!isDevMode) {
        // Spawn ollama.exe model framework server on start up.
        const ollamaChild = cp.spawn(
            `${__dirname}/${process.env.OLLAMA_SERVER_PATH}`,
            ['serve'],
        );

        // Set up ollama child process stdout "info" logs.
        ollamaChild.stdout.setEncoding('utf8');
        ollamaChild.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            AppLogger.instance.writeInfo(data.toString());
        });

        // Set up ollama child process stderr "error" logs.
        ollamaChild.stderr.setEncoding('utf8');
        ollamaChild.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
            AppLogger.instance.writeError(data.toString());
        });

        // Spawn app.exe Python Flask server on start up.
        const appChild = cp.spawn(
            `${__dirname}/${process.env.APP_SERVER_PATH}`,
        );

        // Set up app child process stdout "info" logs.
        appChild.stdout.setEncoding('utf8');
        appChild.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            AppLogger.instance.writeInfo(data.toString());
        });

        // Set up app child process stderr "error" logs.
        appChild.stderr.setEncoding('utf8');
        appChild.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
            AppLogger.instance.writeError(data.toString());
        });
    }
});

// Force kill process on exit. This is necessary for killing ALL Node spawned child processes on Windows platform.
// See answer to this Stackoverflow question: <https://stackoverflow.com/questions/70803840/how-to-kill-a-nodejs-child-exec-process>
process.on('exit', function () {
    cp.exec('taskkill /F /T /PID ' + process.pid);
});
