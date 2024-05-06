import express, { urlencoded } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.routes';

// Connectar a MongoDB
require('.././config/mongodb.config')


// Inicializar Express
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({extended:true}))

//Configutar cors
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
    ]
}));

// Rutas
app.use('/api/user', userRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});