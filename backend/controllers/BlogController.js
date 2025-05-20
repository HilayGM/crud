//impoortart nuestro modelol
import BlogModel from "../models/BlogModel.js";

//metoodos para el crud
//mostrar todos los blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll(); //en la const se guardan la funcion de ver toodos
    res.json(blogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un blog
export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(blog[0])
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un blog
export const createBlog = async (req, res) => {
    try {
       await BlogModel.create(req.body)
       res.json({
        "message": "Blog creado"
       })
    } catch (error) {
        res.json({ message: error.message });
    }
}
//actualizar un blog
export const updateBlog = async (req, res) => {
    try {
        await BlogModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Blog actualizado"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}
//eliminar un blog
export const deleteBlog = async (req, res) => {
    try {
        await BlogModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Blog eliminado"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}
