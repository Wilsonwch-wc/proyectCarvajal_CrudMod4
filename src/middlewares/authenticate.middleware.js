import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    try {
        // Obtener el token del encabezado de autorización
        const authHeader = req.headers['authorization']; // Usa corchetes, no paréntesis
        console.log('authHeader', authHeader);

        // Extraer el token del formato "Bearer <token>"
        const token = authHeader && authHeader.split(' ')[1];
        console.log('token', token);

        // Si no hay token, responder con 401 (no autorizado)
       if(!token)return res.sendStatus(401);
        // Verificar el token usando la clave secreta
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret, (err, user) => {
            if (err) return res.sendStatus(403);

          console.log('user', user);
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in authenticateToken:', error);
        res.status(500).json({ message: "Server error" });
    }
}
