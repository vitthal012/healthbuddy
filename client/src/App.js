import './App.css';
import Button from './components/button'; 
import {useEffect, useState} from 'react';
import Card from './components/card';


function App() {
  
  const [fp,setfp]=useState(false);
  const [fc,setfc]=useState(false);
  const [fs,setfs]=useState(false);
  const [fm,setfm]=useState(false);
  const [data,setdata]=useState({"protein":""});

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}`).then(res=> res.json()).then(d=>{setdata(d);});
  },[]);

  const fetchprotein=()=>{
    setfp(!fp);
  }
  const fetchcreatine=()=>{
    setfc(!fc);
  }
  const fetchsteroids=()=>{
    setfs(!fs);
  }
  const fetchminerals=()=>{
    setfm(!fm);
  }

  return (
    <>
      <Button value={"Protein"}   func={fetchprotein} />
      {fp?<Card  value={data.protein}/>:""}<br/>
      
      <Button value={"Creatine"}  func={fetchcreatine} />
      {fc?<Card  value={data.creatine}/>:""}<br/>

      <Button value={"Steroids"}  func={fetchsteroids} />
      {fs?<Card  value={data.steroids}/>:""}<br/>

      <Button value={"Minerals"}  func={fetchminerals} />
      {fm?<Card  value={data.minerals}/>:""}<br/>
    </>
  );
}

export default App;
