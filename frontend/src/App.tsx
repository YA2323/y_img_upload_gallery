import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

  const[hi,setHi] = useState()

  useEffect(() => {
    sayHI()
  }, [])

  const sayHI = () => {
    axios.get("/a")
        .then((response)=>response.data)
        .then(setHi)
  }

  return (
    <div className="App">
      <div>Hi Frontend</div>
      <div>{hi}</div>
    </div>
  );
}

export default App;
