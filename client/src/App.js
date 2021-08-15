import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import {useEffect,useState} from 'react';
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient.connect(ENDPOINT);

function App() {
  const [fake,setFake]=useState(false)
  

  useEffect(() => {
    socket.on("recieve_tick", ()=>recievedTick());
  }, [])

  const recievedTick=()=>{
    console.log("recieved ticks")
    setFake(!fake)
  }

  const sendTick=()=>{
    socket.emit('send_tick',[])
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <input type="checkbox" Checked={fake} onClick={()=>sendTick()}></input>
      </header>
    </div>
  );
}

export default App;
