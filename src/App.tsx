
import './App.css'
import Layout from './Layout/Layout'
import Formulario from './components/Formulario'
import Login from './pages/Login'
import Topicos from './pages/Topicos'
import { BrowserRouter as Router, Route, Routes, BrowserRouter, NavLink } from 'react-router-dom'
import { useAuth } from './utils/Auth'
import { useMemo } from 'react'
import { ProtectedRoute } from './utils/ProtectedRoute'

function App() {
  const {signout, isAuthenticated, user} = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ? 
      <p>{user!.username}
      <button onClick={() => {signout ()}}>Sair</button>
      </p>
      : <p>Olá visitante</p>)
  },[isAuthenticated])

  return (
  <div>
    <BrowserRouter>
      <header>
        <span>
          {authBlock}
        </span>
        <nav>
          <ul>
            <li><NavLink to='/'>Login</NavLink></li>
            <li><NavLink to='/topicos'>Topicos</NavLink></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login/>}/>
        {/*<Route path='/topicos' element={<Topicos/>}/>
        <Route path='/form' element={<Formulario/>}/>*/}
        <Route path='/topicos' element={<ProtectedRoute><Topicos/></ProtectedRoute>}/>
        <Route path='/form' element={<ProtectedRoute><Formulario/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </div>

        
  )
}

export default App
