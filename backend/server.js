import express from 'express'
import Data from './Data.js'

const app = express();
const port= process.env.PORT || 9000;

app.get('/' , (req,res)=> res.status(200).send('server is ready'));

app.get('/api/products' ,(req,res)=> res.status(200).send(Data.products))

app.listen(port , () => console.log(`server runing on http://localhost:${port}`))