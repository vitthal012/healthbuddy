import { useState } from "react";

export default function Card({value}){

    const[res,setres]=useState("");
    const[ip,setip]=useState("");

    const sendmessage=async ()=>{
        console.log("sendmessage is working:",`${process.env.REACT_APP_BACKEND_URL}chat`);
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
    {console.log(value)}
    <div className="card" dangerouslySetInnerHTML={{ __html: value }}></div>
    <input value={ip} onChange={(e)=>{setip(e.target.value)}} placeholder="            Enter Your Question Child" />

    <button onClick={sendmessage}>Send</button>

    <div className="chatbot">{res}</div>
    </>
    );}