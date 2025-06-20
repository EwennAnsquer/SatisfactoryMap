import { useKeycloakContext } from '../contexts/KeycloakContext'
import { Outlet } from 'react-router'

export default function AuthenticatedLayout() {
  const { initialized } = useKeycloakContext()
  if (!initialized) {
    return <div>Loading authentication...</div>
  }
  return <Outlet />
}