import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 
import Login from './auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

  if (loading) return <div>Cargando sistema...</div>;

  // SI NO HAY SESIÓN -> MUESTRA LOGIN
  if (!session) {
    return <Login />
  }

  // SI HAY SESIÓN -> MUESTRA LA APP Y RUTAS
  return (
    <div className="App">
       {/* Barra de navegación simple */}
       <nav style={{padding: '10px', background: '#f8f9fa', marginBottom: '20px'}}>
          <span>Bienvenido: {session.user.email}</span>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="btn btn-danger btn-sm" 
            style={{marginLeft: '15px'}}
          >
            Cerrar Sesión
          </button>
       </nav>
       
       {/* AQUÍ VAN TUS RUTAS ORIGINALES */}
       <Routes>
           <Route path='/' element={ <CompShowBlogs /> } />
           <Route path='/create' element={ <CompCreateBlog /> } />
           <Route path='/edit/:id' element={ <CompEditBlog /> } />
       </Routes>
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