import { supabase } from '../supabaseClient'
import React, { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        <div> 
            <h3>Edit Blog</h3>
            <form onSubmit={update}>
                <div className="bm-3">
                    <label className="form-label">title</label>
                    <input value={title}
                    onChange={ (e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"></input>
                </div>
                <div className="bm-3">
                    <label className="form-label">content</label>
                    <textarea value={content}
                    onChange={ (e) => setContent(e.target.value)}
                    type="text"
                    className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">actualizar</button>
            </form>
        </div>
    )
}

export default CompEditBlog