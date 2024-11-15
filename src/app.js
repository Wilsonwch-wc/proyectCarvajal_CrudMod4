//EXPRESS
//INSTALACION : npm i express
//INSTALACION DE BSCRIPT
import express from 'express';
import morgan from 'morgan';
import UsersRoutes from './routes/users.routes.js'; 
import authRoutes from './routes/auth.routes.js'; 
import tasksrouter from './routes/tasks.routes.js';
import { authenticateToken } from './middlewares/authenticate.middleware.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
//DIRECCION DE LINK
app.use('/api/login',authRoutes);
app.use('/api/users',UsersRoutes);
app.use('/api/tasks',authenticateToken,tasksrouter);

export default app;
