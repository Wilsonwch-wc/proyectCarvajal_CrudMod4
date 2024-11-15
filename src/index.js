import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import sequelize from './database/database.js'; // Asegúrate de importar la instancia de Sequelize

async function main() {
   
        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: true }); // Usa `{ force: true }` para sobrescribir las tablas existentes
        const port = process.env.PORT;
        logger.info('Base de datos sincronizada correctamente.');

     
       
        app.listen(port)
        logger.info(`Servidor iniciado en el puerto ${port}`);
    
}

main();
