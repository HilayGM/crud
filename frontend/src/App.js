import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Importamos componentes
import Login from './auth/login'; // <--- Revisa que esta ruta coincida con tus carpetas
import CompShowBlogs from './blog/ShowBlog';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';

// Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Intentar recuperar el token si recargas la página
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // --- LÓGICA DE PROTECCIÓN (AQUÍ ESTÁ LA SOLUCIÓN) ---
  if (!token) {
    // ERROR ANTERIOR: Probablemente tenías solo <Login />
    // CORRECCIÓN: Debes pasarle la función setToken así:
    return <Login setToken={setToken} />; 
  }

  // Si hay token, mostramos la App completa
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
      </header>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <CompShowBlogs /> } />
            <Route path='/create' element={ <CompCreateBlog /> } />
            <Route path='/edit/:id' element={ <CompEditBlog /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;