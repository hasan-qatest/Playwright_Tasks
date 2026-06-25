export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export class Logger {

    static log(level: LogLevel, message: string): void {
        console.log(`[${level}] ${new Date().toISOString()} - ${message}`);
    }

    static info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    static warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    static error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    static success(message: string): void {
        this.log(LogLevel.SUCCESS, message);
    }
}