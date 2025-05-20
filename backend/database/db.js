import { Sequelize } from "sequelize";

const db= new Sequelize('database_app', 'root', '',{ 
    host:'localhost', 
    dialect:'mysql'
})


export default db;



///asi nos conectamos a la base de datos