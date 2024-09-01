import { fileURLToPath } from 'node:url';
import path from 'node:path'
import * as fs from 'fs'

enum LogTypes {
    info,
    error,
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @description AppLogger singleton class for writing logs to output text files.
 * @usage To consume the ``writeInfo`` and ``writeError`` methods do NOT new up an instance of this class.
 * Instead access the ``instance`` singleton field by ``AppLogger.instance.writeInfo(...)``
 * The ``logs`` directory will be located at the root of the project directory.``
 */
export class AppLogger {
    private static _instance: AppLogger

    private logId = 100001

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    private write(logType: LogTypes, logData: string) {
        const currentTimeUTC = new Date().toUTCString()
        const log = `LogId: ${this.logId} at ${currentTimeUTC}: ${logData}`
        let logPath = ''

        switch (logType) {
            case LogTypes.info:
                logPath = '../../logs/info.output'
                this.logId++
                break
            case LogTypes.error:
                logPath = '../../logs/error.output'
                this.logId++
                break
        }

        if (logPath.length > 0) {
            fs.appendFile(`${__dirname}/${logPath}`, log + '\n', (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }

    /**
     * Appends a log to the ``info.output`` log file in the ``logs`` directory.
     * @param logData Data buffer to be logged. Use JSON.stringify(...) for JSON based data.
     */
    public writeInfo(logData: string) {
        this.write(LogTypes.info, logData)
    }

    /**
     * Appends a log to the ``error.output`` log file in the ``logs`` directory.
     * @param logData Data buffer to be logged. Use JSON.stringify(...) for JSON based data.
     */
    public writeError(logData: string) {
        this.write(LogTypes.error, logData)
    }
}
