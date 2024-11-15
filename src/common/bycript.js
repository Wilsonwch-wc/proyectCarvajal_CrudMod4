import logger from "../logs/logger.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const encriptar = async (texto) => {
    try {
        const saltos =+process.env.BSCRIPT_SALT; // Convertir saltos a número
        return await bcrypt.hash(texto, 10);

    } catch (error) { 

        logger.error("Error en encriptar: ", error); // Registra el error
        throw new Error("Error en encriptar: " + error.message); // Agrega el mensaje del error
    }
};

export const comparar = async (texto, hash) => {
    try {
        if (!texto || !hash) {
            throw new Error("Texto o hash no proporcionado");
        }
        return await bcrypt.compare(texto, hash);
    } catch (error) {
        logger.error("Error en comparar:", error); // Mejor manejo de errores
        throw new Error("Error en comparar: " + error.message);
    }
};
