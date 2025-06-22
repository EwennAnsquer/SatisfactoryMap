import { BrowserRouter, Routes, Route, Link } from 'react-router'
import AuthenticatedLayout from './layout/AuthenticatedLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { ThemeProvider } from "./contexts/ThemeProvider.tsx"
import { ModeToggle } from './components/mode-toggle'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <nav className="flex items-center justify-between p-4">
          <div>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/profile">Profile</Link>
          </div>
          <ModeToggle />
        </nav>
        <Routes>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}