import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import blogRoutes from './routes/routes.js';

// CORRECCIÓN 1: Importación estática directa
// Esto asume que en supabase.js tienes "export default supabase"
import supabase from './supabase.js'; 

const app = express();

// CORRECCIÓN 2: Configuración de CORS única y al principio
// Esto permite que el puerto 3000 (React) hable con el 8000 (Backend)
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(express.json());

// Rutas
app.use('/blogs', blogRoutes);

// Conexión a Base de Datos SQL (MySQL/Postgres)
try {
    await db.authenticate();
    console.log('Conexión a la base de datos SQL exitosa.');
} catch (error) {
    console.log('Error al conectar a la base de datos SQL:', error);
}

// --- RUTA DE LOGIN ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Intento de login para:", email);

    // Ahora sí funcionará porque 'supabase' es el cliente directo
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Error Supabase:", error.message);
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Login exitoso
    return res.status(200).json({ 
        message: 'Bienvenido', 
        token: data.session.access_token, // Tu frontend usará este token
        user: data.user 
    });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});