import { supabase } from '../supabaseClient'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Blog.css'

const CompCreateBlog = () => {

    const [title, setTitle] =  useState('')
    const [content, setContent] =  useState('')
    const navigate = useNavigate()

    const store =  async (e) => {
        e.preventDefault()
        const { data: { user } } = await supabase.auth.getUser()
        await supabase.from('blogs').insert({title: title, content: content, user_id: user.id})
        navigate('/')
    }

    return (
        <div className='blog-container'>
            <div className='form-card'>
                <div className='form-header'>
                    <h3>Crear Nuevo Blog</h3>
                </div>
                <form onSubmit={store}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input 
                            value={title}
                            onChange={ (e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control-styled"
                            placeholder='Ingresa el título'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contenido</label>
                        <textarea 
                            value={content}
                            onChange={ (e) => setContent(e.target.value)}
                            type="text"
                            className="form-control-styled"
                            rows="5"
                            placeholder='Escribe aquí tu contenido...'
                        />
                    </div>
                    <button type="submit" className="btn-save">Guardar</button>
                    <button type="button" onClick={() => navigate('/')} className="btn-save" style={{marginTop: '10px', background: '#ccc'}}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default CompCreateBlog