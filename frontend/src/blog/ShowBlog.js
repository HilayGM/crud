import { supabase } from '../supabaseClient'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Blog.css' // Importamos los nuevos estilos

const CompShowBlogs = () => {
    
    const [blogs, setBlog] = useState([])
    useEffect( ()=>{
        getBlogs()
    },[])

    const getBlogs = async () => {
        const { data } = await supabase.from('blogs').select()
        if (data) setBlog(data)
    }

    const deleteBlog = async (id) => {
       await supabase.from('blogs').delete().eq('id', id)
       getBlogs()
    }

    return(
        <div className='blog-container'>
            <div className='blog-header'>
                <h1>Mis Publicaciones</h1>
                <Link to="/create" className='btn-create'>
                    <i className="fas fa-plus"></i> Nuevo Blog
                </Link>
            </div>

            <div className='blog-grid'>
                {blogs.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-folder-open"></i>
                        <h3>Presiona "Nuevo Blog" para comenzar</h3>
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <div className="card-header">
                                <h3 className="card-title">{blog.title}</h3>
                            </div>
                            <div className="card-body">
                                <p className="card-content">{blog.content}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/edit/${blog.id}`} className='btn-action btn-edit'>
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <button onClick={()=>deleteBlog(blog.id)} className='btn-action btn-delete'>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CompShowBlogs