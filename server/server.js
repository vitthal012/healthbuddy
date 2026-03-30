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

    // connecting to google gen ai
    const ai = new GoogleGenAI({});

    // searching for diet(the collection) in the database and converting the cursor to json with toArray()
    let data=await db.collection("diet").find().toArray();

    // posting the user request to the chatbot 
    app.post('/chat', async (req, res) => {
    let message = req.body.message;

    const prompt = `
                  You are a health and nutrition assistant.
                  
                  Give a clean, well-structured answer using proper Markdown.
                  
                  Rules:
                  - Use bullet points with "-"
                  - Use **bold headings**
                  - Add line spacing
                  - Keep it short and readable
                  - No unnecessary paragraphs
                  
                  User question:${message}`;
                  
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        res.json(response.text );
    } catch (e) {
        res.json("Error generating response" );
    }
});
    
    // getting preresearched data by me which appears in the beginnning of the cards before the chatbot 
    app.get('/',(req,res)=>{
        res.json(data[0]);
    });
    
    // lalalal
    app.listen(process.env.PORT,()=>
        console.log(`server launched succeessfully at http://localhost:${process.env.PORT}`)
    );
 }
 catch(e){
    console.log(`starter error:`,e.message)
 }
}

// using this so i can use async
start();