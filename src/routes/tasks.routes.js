import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";

const router = Router();

router
    .route('/')
    .get(tasksController.getTasks) // Referencia correcta
    .post(tasksController.createTask); // Referencia correcta

router
    .route('/:id')
    .get(tasksController.getTask) // Referencia correcta
    .put(tasksController.updateTask) // Referencia correcta
    .delete(tasksController.deleteTask) // Referencia correcta
    .patch(tasksController.taskDone); // Referencia correcta

export default router;
