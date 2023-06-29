import 'bootswatch/dist/lux/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Personajes from "./screens/Personajes";
import Ubicaciones from "./screens/Ubicaciones";
import Episodios from "./screens/Episodios";
import Navbar from "./componentes/Navbar";
import PersonajeDetalle from './componentes/PersonajeDetalle';
import UbicacionDetalle from './componentes/UbicacionDetalle';
import EpisodioDetalle from './componentes/EpisodioDetalle';



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personajes/:id" element={<PersonajeDetalle/>} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="/ubicaciones/:id" element={<UbicacionDetalle/>} />
        <Route path="/episodios" element={<Episodios />} />
        <Route path="/episodios/:id" element={<EpisodioDetalle/>} />
      </Routes>
    </>
  )
}

export default App