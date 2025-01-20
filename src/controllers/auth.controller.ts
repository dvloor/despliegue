import { Request, Response } from 'express';
import Admin from '../models/admins';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export const login = async (req: Request, res: Response) => {
    const { user, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { user } });

        if (!admin) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Validación de la contraseña
        if (password !== admin.password) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ msg: 'Login exitoso', token });
        
    } catch (error) {
        res.status(500).json({ msg: 'Error al autenticar', error });
    }
};
