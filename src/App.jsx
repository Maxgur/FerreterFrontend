import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar";
import { Productos } from "./pages/Productos";
import { Inicio} from "./pages/Inicio";
import { Contactanos } from "./pages/Contactanos";
import { Loggin } from './pages/login';

function App() {

  const url = "http://127.0.0.1:8000/api/"
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
        <Route path="/products" element={<Productos url={url} />} />
        <Route path='/inicio' element={<Inicio/>}/> 
        <Route path='/contactanos' element={<Contactanos/>}/>
        <Route path='/login' element={<Loggin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
