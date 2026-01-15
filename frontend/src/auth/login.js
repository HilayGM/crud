import React, { useState } from 'react';

// Recibimos 'setToken' como prop desde App.js
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        console.log('Login correcto:', data);
        
        // 1. Guardamos el token en localStorage para que no se pierda al recargar
        localStorage.setItem('token', data.token);

        // 2. CAMBIO CLAVE: Avisamos a App.js que ya tenemos token
        // Esto hará que Login desaparezca y aparezca la App
        setToken(data.token); 

      } else {
        setErrorMsg(data.error || 'Error al iniciar sesión');
      }

    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      
      {errorMsg && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Correo:</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="tu@email.com" 
        />

        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="******" 
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;