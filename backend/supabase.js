import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Verificación de seguridad para depurar
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Faltan las variables SUPABASE_URL o SUPABASE_KEY en el archivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ESTA LÍNEA ES LA CLAVE:
export default supabase;