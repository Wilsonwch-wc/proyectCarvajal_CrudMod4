import logger from "../logs/logger.js";
import {User} from "../model/users.js";
import { comparar } from "../common/bycript.js"; 
import jwt from 'jsonwebtoken';
import 'dotenv/config';
async function login(req,res) {
try {
    const {username,password}= req.body;
    const user = await User.findOne({ where: { username:username } });
    if (!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
    if(!(await comparar(password,user.password)))
        return res.status(403).json({ message: "Usuario no autorizado" });
    const secret = process.env.JWT_SECRET
    const segundos = process.env.JWT_EXPIRES_SECONDS;
    const token=jwt.sign({userId:user.id},secret,{expiresIn:eval(segundos),


    });
    res.json({token})

} catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error logging in" });
}
    
}
export default {
    login
}