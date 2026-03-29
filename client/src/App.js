import './App.css';
import Button from './components/button'; 
import {useState} from 'react';


function App() {
  const [fp,setfp]=useState(false);
  const [fc,setfc]=useState(false);
  const [fs,setfs]=useState(false);
  const [fm,setfm]=useState(false);

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
      <Button value={"Protein"}  func={fetchprotein} />
      {fp?"true":"false"}<br/>
      <Button value={"Creatine"} func={fetchcreatine} />
      {fc?"true":"false"}<br/>
      <Button value={"Steroids"} func={fetchsteroids} />
      {fs?"true":"false"}<br/>
      <Button value={"Minerals"} func={fetchminerals} />
      {fm?"true":"false"}<br/>
    </>
  );
}

export default App;
