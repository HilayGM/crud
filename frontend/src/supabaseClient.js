import { createClient } from '@supabase/supabase-js'

// Copia aquí tus claves (las mismas que tenías en el backend)
const supabaseUrl = 'https://vaxmnoaizkxfimlotaba.supabase.co'
const supabaseKey = 'sb_publishable_ILFG29mwxJmN5PjklVJuBA_tiLBEWnZ'

export const supabase = createClient(supabaseUrl, supabaseKey)