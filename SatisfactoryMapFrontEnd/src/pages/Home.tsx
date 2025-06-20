import { useEffect, useState } from 'react'
import { useKeycloakContext } from '../contexts/KeycloakContext'
import api from '../api/axios'

import '../App.css'

export default function Home() {
  const { keycloak, authenticated, initialized } = useKeycloakContext();
  const [array, setArray] = useState([]);

  const apiURL=import.meta.env.VITE_BACK_APP_API_URL
  const minioURL=import.meta.env.VITE_MINIO_BUCKET_API_URL

  console.log(import.meta.env.VITE_KEYCLOAK_URL)

  const fetchAPI = async () =>{
    const response = await api.get('/users')
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
        <button onClick={() => { alert(keycloak.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}>
          Is Authenticated
        </button>
        <button onClick={() => { keycloak.login() }}>
          login
        </button>
        <button onClick={() => { alert(keycloak.token) }}>
          Show Access Token
        </button>
        <button onClick={() => { alert(JSON.stringify(keycloak.tokenParsed)) }}>
          Show Parsed Access Token
        </button>
        <button onClick={() => { alert(keycloak.isTokenExpired(5).toString()) }}>
          Check Token Expire
        </button>
        <button onClick={() => { keycloak.updateToken(10).then((refreshed) => { alert('Token Refreshed: ' + refreshed.toString()) }, (e) => { alert('Refresh Error') }) }}>
          UPDATE Token (if about to expire)
        </button> 
        <button onClick={() => { keycloak.logout({ redirectUri: 'http://localhost:5173/' }) }}>
          logout
        </button>
    </div>
  )
}