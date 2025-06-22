import { useEffect, useState } from 'react'
import { useKeycloakContext } from '../contexts/KeycloakContext'
import { Button } from "@/components/ui/button"
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
        <Button onClick={() => { alert(keycloak.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}>
          Is Authenticated
        </Button>
        <Button onClick={() => { keycloak.login() }}>
          login
        </Button>
        <Button onClick={() => { alert(keycloak.token) }}>
          Show Access Token
        </Button>
        <Button onClick={() => { alert(JSON.stringify(keycloak.tokenParsed)) }}>
          Show Parsed Access Token
        </Button>
        <Button onClick={() => { alert(keycloak.isTokenExpired(5).toString()) }}>
          Check Token Expire
        </Button>
        <Button onClick={() => { keycloak.updateToken(10).then((refreshed) => { alert('Token Refreshed: ' + refreshed.toString()) }, (e) => { alert('Refresh Error') }) }}>
          UPDATE Token (if about to expire)
        </Button> 
        <Button onClick={() => { keycloak.logout({ redirectUri: 'http://localhost:5173/' }) }}>
          logout
        </Button>
    </div>
  )
}