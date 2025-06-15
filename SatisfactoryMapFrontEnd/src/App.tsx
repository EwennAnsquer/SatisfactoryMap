import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () =>{
    const response = await axios.get("http://localhost:8080/api/users")
    setArray(response.data.users)
  };

  useEffect(()=>{
    fetchAPI()
  },[])

  return (
    <div>
      <h1>Satisfactory Map</h1>
        {array.map((user, index) => (
          <div key={index}>
            <span>{user}</span><br></br>
          </div>
        ))}
        <img src="http://localhost:9000/satisfactorymap/image.webp" alt="My Image" />
    </div>
  )
}

export default App
