export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  },
  
  error: (message: string | Error, ...args: any[]) => {
    if (message instanceof Error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message.message}`, message.stack, ...args);
    } else {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args);
    }
  },
};
