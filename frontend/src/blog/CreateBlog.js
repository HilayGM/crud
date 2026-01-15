import { supabase } from '../supabaseClient'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
        <div>
            <h3>Create Blog</h3>
            <form onSubmit={store}>
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
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default CompCreateBlog