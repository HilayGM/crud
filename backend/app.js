import express from 'express';
import cors from 'cors';
import db from './database/db.js';

import blogRoutes from './routes/routes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/blogs', blogRoutes)


try {
   await db.authenticate()
   console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Unable to connect to the database:', error);
}



/**
 * app.get('/', (req, res) => {
    res.send('Hello World!')
})
 */




app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})