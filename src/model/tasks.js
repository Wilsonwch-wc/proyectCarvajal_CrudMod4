import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Tasks = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {  // Asegúrate de que esta columna esté definida
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
