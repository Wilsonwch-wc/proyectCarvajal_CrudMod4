import { DataTypes } from "sequelize"; // Importar DataTypes correctamente
import sequelize from "../database/database.js"; // Importar instancia configurada de sequelize
import { Status } from "../constants/index.js";
import { Tasks } from "./tasks.js";
import { encriptar } from "../common/bycript.js";
import logger from "../logs/logger.js";
// Definición del modelo User
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El nombre de usuario no puede ser nulo',
            },
        },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
  
        validate: {
            notNull: {
                msg: 'El clave de usuario no puede ser nulo',
            },
        },
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Estado incorrecto, debe ser "active" o "inactive"',
            },
        },
    },
});

User.hasMany(Tasks, { foreignKey: 'userId' });
Tasks.belongsTo(User, { foreignKey: 'userId' });
/*
User.hasMany(Tasks);
Tasks.belongsTo(User);
*/
/*
User.hasMany(Tasks{
    foreignKey: 'userId',
    sourceKey: 'id'
})
Tasks.belongsTo(User,{
    foreignKey: 'taskId',
    targetKey: 'id'
})
    */

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) { // Usa "error" aquí también
        logger.error("Error en el hook beforeCreate:", error); // Registra el error
        throw new Error("Error al encriptar en beforeCreate: "); // Lanza el error
    }
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) { // Usa "error"
        logger.error(error.message); // Registra el error
        throw new Error("Error al encriptar en beforeUpdate: "); // Lanza el error
    }
});
 