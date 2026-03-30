import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Card({value}){

    const[res,setres]=useState("");
    const[ip,setip]=useState("");

    const sendmessage=async ()=>{
        try
        {
            let r=await fetch(`${process.env.REACT_APP_BACKEND_URL}chat`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({message:ip})});
            setres(await r.json());
        }catch(e){
            console.log(e.message)
            setres(`Error occured while sending message: ${e.message}`);
        }
}
    
    return(
    <>
    <div className="card" dangerouslySetInnerHTML={{ __html: value }}></div>
    <input value={ip} onChange={(e)=>{setip(e.target.value)}} placeholder="            Enter Your Question Child" />

    <button onClick={sendmessage}>Send</button>

    <div className="chatbot"><ReactMarkdown>{res}</ReactMarkdown></div>
    </>
    );}