import express from 'express';
import run from './db/mongodb.js';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();
const app=express();

app.use(cors());

async function start(){
 try{

    await run(); 

    app.get('/',(req,res)=>{
        res.json({hello:"vitthal"})
    });
    
    app.listen(process.env.PORT,()=>
        console.log(`server launched succeessfully at http://localhost:${process.env.PORT}`)
    );
 }
 catch(e){
    console.log(`starter error:`,e.message)
 }
}

start();