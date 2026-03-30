import { useEffect,useState } from "react";

export default function Card({value,type}){
    const[res,setres]=useState("");
    const[ip,setip]=useState("Enter your question child");

    useEffect(()=>{
    async function pos(){

        let r=await fetch(`${process.env.REACT_APP_BACKEND_URL}chat${type}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({message:`hey its vitthal here using ${type}`})}
        );
        setres(await r.json());
    }
    pos();
    },[]);

    return(
    <>
    <div className="card">{value}</div>
    <input>{ip}</input>
    <div className="chatbot">{res.message}</div>
    </>
    );
}