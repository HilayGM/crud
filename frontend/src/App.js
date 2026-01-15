import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 
import Login from './auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; 

// Importamos tus componentes del Blog
import CompShowBlogs from './blog/ShowBlog';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';

function AppContent() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div className="loading-screen">Cargando sistema...</div>;

  // SI NO HAY SESIÓN -> MUESTRA LOGIN
  if (!session) {
    return <Login />
  }

  // SI HAY SESIÓN -> MUESTRA LA APP Y RUTAS
  return (
    <div className="App">
       {/* Barra de navegación moderna */}
       <nav className="navbar">
          <div className="navbar-brand">
            Mi Blog Personal
          </div>
          <div className="navbar-user">
            <span className="user-email">
              <i className="fas fa-user-circle"></i>
              {session.user.email}
            </span>
            <button 
              onClick={() => supabase.auth.signOut()} 
              className="btn-logout"
            >
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          </div>
       </nav>
       
       {/* Contenido principal */}
       <main>
        <Routes>
            <Route path='/' element={ <CompShowBlogs /> } />
            <Route path='/create' element={ <CompCreateBlog /> } />
            <Route path='/edit/:id' element={ <CompEditBlog /> } />
        </Routes>
       </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;