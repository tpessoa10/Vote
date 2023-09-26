
import './App.css'
import Formulario from './components/Formulario'
import Topicos from './pages/Topicos'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Topicos/>}/>
          <Route path='/form' element={<Formulario/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
