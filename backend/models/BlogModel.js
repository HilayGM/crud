///el modelo le dice o interpreta a sequelize 

// importamos la cxeacion de la base de datos
import db from "../database/db.js";
//importamos el modelo de sequelize
import { DataTypes } from "sequelize";

const BlogModel =//como tal lo que esta abajo es el modelo
db.define('blog', {
    title:{type: DataTypes.STRING},
    content:{type: DataTypes.STRING},
})

export default BlogModel