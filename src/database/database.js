import { Sequelize } from "sequelize";
import dotenv from "dotenv"; // Importa dotenv para cargar las variables del archivo .env

// Cargar las variables de entorno
dotenv.config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
    process.env.DB_DATABASE, // Nombre de la base de datos
    process.env.DB_USER,     // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host del servidor
        dialect: process.env.DB_DIALECT || 'postgres', // Dialecto de la base de datos
        port: process.env.DB_PORT || 5432, // Puerto de la base de datos
        logging: false, // Desactiva el registro de consultas en consola
    }
);

// Exportar la instancia
export default sequelize;
