import { createContext, useContext } from 'react'
import { useKeycloak } from '../hooks/useKeycloak'

const KeycloakContext = createContext<ReturnType<typeof useKeycloak> | undefined>(undefined)

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const keycloakState = useKeycloak()
  return (
    <KeycloakContext.Provider value={keycloakState}>
      {children}
    </KeycloakContext.Provider>
  )
}

export function useKeycloakContext() {
  const ctx = useContext(KeycloakContext)
  if (!ctx) throw new Error('useKeycloakContext must be used within a KeycloakProvider')
  return ctx
}