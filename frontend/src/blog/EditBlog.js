'use client'

import { supabase } from '../supabaseClient'
import React, { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Blog.css'

const CompEditBlog = () => {
    const [title, setTitle] =  useState('')
    const [content, setContent] =  useState('')
    const navigate = useNavigate()

    const {id} = useParams()
    const update = async (e) => {
        e.preventDefault()
        await supabase.from('blogs').update({
            title: title, 
            content: content
        }).eq('id', id)
        navigate('/')
    }
    useEffect(()=>{
        getBlogById()
    }, [])

    const getBlogById = async () => {
        const { data } = await supabase.from('blogs').select().eq('id', id).single()
        if (data) {
            setTitle(data.title)
            setContent(data.content)
        }
    }
    return(
        <div className='blog-container'>
            <div className='form-card'>
                <div className='form-header'>
                    <h3>Editar Blog</h3>
                </div>
                <form onSubmit={update}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input 
                            value={title}
                            onChange={ (e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control-styled"
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
                        />
                    </div>
                    <button type="submit" className="btn-save">Actualizar</button>
                    <button type="button" onClick={() => navigate('/')} className="btn-save" style={{marginTop: '10px', background: '#ccc'}}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default CompEditBlog