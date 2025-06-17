import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [array, setArray] = useState([]);

  const apiURL=import.meta.env.VITE_BACK_APP_API_URL
  const minioURL=import.meta.env.VITE_MINIO_BUCKET_API_URL

  console.log(import.meta.env.VITE_BACK_APP_API_URL)

  const fetchAPI = async () =>{
    const response = await axios.get(`${apiURL}/users`)
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
        <img src={`${minioURL}/image.webp`} alt="My Image" />
    </div>
  )
}

export default App
