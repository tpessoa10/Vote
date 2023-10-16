
import './App.css'
import Layout from './Layout/Layout'
import Formulario from './components/Formulario'
import Login from './pages/Login'
import Topicos from './pages/Topicos'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuth } from './utils/Auth'
import { useMemo } from 'react'
import { ProtectedRoute } from './utils/ProtectedRoute'

function App() {
  const {signout, isAuthenticated, user} = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ? 
      <p>{user?.username}
      <button onClick={() => {signout ()}}>Sair</button>
      </p>
      : <p>Olá visitante</p>)
  },[isAuthenticated])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
           <Route index element={<Login/>}/>
            {/*<Route path='/topicos' element={<Topicos/>}/>
            <Route path='/form' element={<Formulario/>}/>*/}
            <Route path='/topicos' element={<ProtectedRoute><Topicos/></ProtectedRoute>}/>
            <Route path='/form' element={<ProtectedRoute><Formulario/></ProtectedRoute>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
