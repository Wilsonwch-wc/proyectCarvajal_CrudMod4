//LOGEO : npm i pino pino-pretty
// npm i morgan
import pino from 'pino';
const logger = pino({
    transports: {
        target:'pino-pretty',
        options:{
            traslateTime:'SYS:dd/mm/yyyy HH:mm:ss',

        },
    },
});

export default logger;