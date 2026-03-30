import express from 'express';
import {connectclus,db }from './db/mongodb.js';
import dotenv from 'dotenv'
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors());

async function start(){
 try{

    // connecting to mongodb
    await connectclus();

    const ai = new GoogleGenAI({});

    let data=await db.collection("diet").find().toArray();

    app.post('/chat',async(req,res)=>{
        let message=req.body.message;
        console.log(message);
        const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${message}`,
        });
        res.json(response.text);
        console.log(response.text);
    });
    
    app.get('/',(req,res)=>{
        res.json(data[0]);
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