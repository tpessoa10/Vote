
import './App.css'
import Layout from './Layout/Layout'
import Formulario from './components/Formulario'
import Topicos from './pages/Topicos'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Topicos/>}/>
            <Route path='/form' element={<Formulario/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
