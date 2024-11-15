
import { Router } from "express";
import controller from "../controllers/auth.controll.js";
const routers = Router();
routers.post('/', controller.login)
export default routers;