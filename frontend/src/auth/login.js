import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Login.css'; // Importamos los estilos modernos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Credenciales incorrectas. Inténtalo de nuevo.');
      console.error('Login error:', error);
    } else {
      console.log("Login exitoso, usuario:", data.user.email);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Bienvenido</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>
        
        {errorMsg && (
          <div className="error-message">
            <span>{errorMsg}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              id="email"
              type="email" 
              className="form-control-styled"
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              placeholder="ejemplo@correo.com" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              className="form-control-styled"
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;