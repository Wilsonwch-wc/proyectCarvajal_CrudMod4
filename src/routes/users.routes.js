import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

// Rutas para usuarios
router
    .route('/') // Ruta base "/api/users"
    .get( userController.getUsers) // Obtener todos los usuarios 
    .post(userController.createUser); // Crear un usuario (no protegido, para registro público)

router
    .route('/:id') // Ruta con parámetro ":id"
    .get(authenticateToken, userController.getUser) // Obtener un usuario específico (protegido)
    .put(authenticateToken, userController.updateUser) // Actualizar usuario completo (protegido)
    .patch(authenticateToken, userController.activate_inactivate) // Activar/Inactivar usuario (protegido)
    .delete(authenticateToken, userController.deleteUser); // Eliminar usuario (protegido)

    router.get('/:id/tasks',authenticateToken, userController.getTasks_user) 
export default router;
