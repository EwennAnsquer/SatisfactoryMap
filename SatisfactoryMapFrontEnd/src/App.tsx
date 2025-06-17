import { useEffect, useState } from 'react'
import axios from 'axios';
import Keycloak from 'keycloak-js'

import './App.css'

let initOptions = {
  url: 'http://localhost:4000/',
  realm: 'SatisfactoryMapRealm',
  clientId: 'SatisfactoryMapClient',
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required',
  checkLoginIframe: false,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    /* http client will use this header in every request it sends */
    axios.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

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
        <button onClick={() => { alert(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}>
          Is Authenticated
        </button>
        <button onClick={() => { kc.login() }}>
          login
        </button>
        <button onClick={() => { alert(kc.token) }}>
          Show Access Token
        </button>
        <button onClick={() => { alert(JSON.stringify(kc.tokenParsed)) }}>
          Show Parsed Access Token
        </button>
        <button onClick={() => { alert(kc.isTokenExpired(5).toString()) }}>
          Check Token Expire
        </button>
        <button onClick={() => { kc.updateToken(10).then((refreshed) => { alert('Token Refreshed: ' + refreshed.toString()) }, (e) => { alert('Refresh Error') }) }}>
          UPDATE Token (if about to expire)
        </button> 
        <button onClick={() => { kc.logout({ redirectUri: 'http://localhost:5173/' }) }}>
          logout
        </button>
    </div>
  )
}

export default App