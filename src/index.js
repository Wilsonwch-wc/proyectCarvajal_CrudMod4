import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import sequelize from './database/database.js'; // Instancia de Sequelize

async function main() {
    try {
        
        await sequelize.sync({ alter: true }); 
        logger.info('Base de datos sincronizada correctamente.');

       
        const port = process.env.PORT ;  
        app.listen(port, () => {
            logger.info(`Servidor iniciado en el puerto ${port}`);
        });
    } catch (error) {
        logger.error('Error al iniciar la aplicación:', error);
    }
}

main();
