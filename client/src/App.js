import './App.css';
import Button from './components/button'; 
import {useEffect, useState} from 'react';
import Card from './components/card';
import Headcard from './components/head_card';

function App() {
  
  const [fp,setfp]=useState(false);
  const [fc,setfc]=useState(false);
  const [fs,setfs]=useState(false);
  const [fm,setfm]=useState(false);
  const [data,setdata]=useState({"protein":"Loading..."});
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}`).then(res=> res.json()).then(d=>{setdata(d);});
  },[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  //if fetch---- button is clicked then show the card and remove othercards
  const fetchprotein=()=>{
    setfp(!fp);
    setfs(false); setfm(false);setfc(false);
  }
  const fetchcreatine=()=>{
    setfc(!fc);
    setfp(false); setfs(false); setfm(false);
  }
  const fetchsteroids=()=>{
    setfs(!fs);
    setfp(false); setfc(false); setfm(false);
  }
  const fetchminerals=()=>{
    setfm(!fm);
    setfp(false); setfs(false); setfc(false);
  }

  return (
    
    <div className="App">

      <div className="bubble-overlay">
         {/*random ball genration for beuty effect */}
         {[...Array(14)].map((_, i) => <span key={i}></span>)}
      </div>

      {/* the window which appear in the beginning describing the app */}
      {showWelcome && <Headcard />}

      <header className="app-header">
        <h1>HealthBuddy</h1>
        <p>Your personal health and nutrition assistant</p>
      </header>

      <div className="button-container">
        <Button value={"Protein"}   func={fetchprotein} />
        <Button value={"Creatine"}  func={fetchcreatine} />
        <Button value={"Steroids"}  func={fetchsteroids} />
        <Button value={"Minerals"}  func={fetchminerals} />
      </div>
      <div className="content">
        {/*Cards which load on clicking the buttons*/}
        {fp && <Card value={data.protein} />}
        {fc && <Card value={data.creatine} />}
        {fs && <Card value={data.steroids} />}
        {fm && <Card value={data.minerals} />}
      </div>
    </div>
  );
}

export default App;
