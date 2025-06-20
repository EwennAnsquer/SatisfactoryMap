// src/hooks/useKeycloak.ts
import { useEffect, useState } from 'react'
import keycloak from '../keycloak'

export function useKeycloak() {
  const [authenticated, setAuthenticated] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!(keycloak as any)._initialized) {
      (keycloak as any)._initialized = true;
      keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: true,
        pkceMethod: 'S256',
        redirectUri: import.meta.env.VITE_FRONT_APP_URL,
      }).then(auth => {
        setAuthenticated(auth)
        setInitialized(true)
      })
    } else {
      setInitialized(true)
    }
    return () => {
      keycloak.onTokenExpired = undefined
    }
  }, [])
  return { keycloak, authenticated, initialized }
}