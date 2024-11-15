import { User } from "../model/users.js";
import { Tasks } from "../model/tasks.js";
import logger from "../logs/logger.js"; // Asegúrate de importar logger si no lo has hecho
import {Status} from "../constants/index.js"
// Controlador para obtener todos los usuarios
async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'], // Corregido "atributes" a "attributes"
            order: [['id', 'DESC']], // Ordenar por id de forma descendente
            where: {
                status: Status.ACTIVE // Corregido el valor 'active', si usas un objeto Status, importa correctamente
            }
        });

        res.json(users); // Retornar la lista de usuarios
    } catch (error) {
        logger.error("Error fetching users: ", error);
        res.status(500).json({ message: "Error fetching users" });
    }
}


// Controlador para crear un usuario
async function createUser(req, res) {
    try {
        const { username, password } = req.body;

      
        // Crear el usuario
        const user = await User.create({ username, password });
        res.json(user);
    } catch (error) {
        logger.error("Error creating user: ", error);
        res.status(500).json({ message: "Error creating user" });
    }
}

// Controlador para obtener un usuario por su ID
async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id,{
            attributes:['username', 'status', 'password']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (error) {
        logger.error("error getUser"+error);
        res.status(500).json({ message: "Error server " });
    }
}

async function updateUser(req, res) {
   const {id}=req.params;
   const {username,password}=req.body;
   try {
    if (!username || !password)
        return res.status(400).json({ message: "Username and password are required" });
    const user = await User.update({
        username,
        password,
    },
    {
    where: {
        id,
    },
    }
);
  res.json(user);

   } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error server" });
   }
}

async function  activate_inactivate(req,res) {
    const {id}=req.params;
    const {status}=req.body;
    try {
        if (!status){
            return res.status(400).json({ message: "Status is required" });
            
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.status === status) {
            return res.status(400).json({ message: "User already has this status" });
        }
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error server" });
    }
  
    
}
async function deleteUser(user) {
    const {id}= req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.json({message: "User deleted    "})

    } catch (error) {
        logger.error(error)
        res.status(500).json({message: "server error" });
    }
}

async function getTasks_user(req, res) {
    const { id } = req.params; // id del usuario
    try {
        const user = await User.findOne({
            attributes: ['username'], // Selecciona solo el atributo 'username'
            where: { id },
            include: [{
                model: Tasks, // Incluir las tareas asociadas
                attributes: ['id', 'name', 'done'], // Atributos que deseas de las tareas
            }],
        });

        res.json(user); // Responde con el usuario y sus tareas
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
}



// Exportar los controladores
export default {
    getUsers,
    createUser,getUser,updateUser,
    activate_inactivate,
    deleteUser,getTasks_user,
};
