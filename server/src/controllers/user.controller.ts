import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

// Función para verificar la confirmación de contraseña al registrar un usuario
function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}


// Registrar un nuevo usuario
export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        // Verifica la confirmación de contraseña
        if (!validatePasswordConfirmation(password, confirmPassword)) {
            res.status(400).json({ message: 'La confirmación de contraseña no coincide' });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email ya está registrado' });
            return;
        }
        const user = new User({ fullName, email, password });
        await user.save();

        const payload = {
            _id: user._id
        };

        const token = jwt.sign(payload, 'PlanAgroSecret');

        res.status(201).json({ message: '¡Usuario registrado correctamente!', user, token });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Login
export async function loginUser(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Authentication failed. Invalid password.' });
            return;
        }
        const payload = {
            _id: user._id
        };

        const token = jwt.sign(payload, 'PlanAgroSecret');
        res.json({ token, user });
    } catch (err) {
        res.status(500).json(err);
    }
}