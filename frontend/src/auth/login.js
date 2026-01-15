import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Importamos la conexión directa

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // --- MAGIA: Login directo sin backend intermedio ---
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Error: Credenciales incorrectas');
      console.error('Login error:', error);
    } else {
      // Login exitoso
      console.log("Login exitoso, usuario:", data.user.email);
      
      // Esperamos un poco para que Supabase actualice la sesión
      // y el listener onAuthStateChange se dispare en App.js
      setTimeout(async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Sesión verificada:", sessionData);
      }, 100);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión (Directo)</h2>
      {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
      
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;