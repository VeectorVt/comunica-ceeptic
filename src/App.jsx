import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Avisos from './pages/Avisos'
import Cardapio from './pages/Cardapio'
import Calendario from './pages/Calendario'
import GradeAulas from './pages/GradeAulas'
import MapaEscola from './pages/MapaEscola'
import Professores from './pages/Professores'
import Eventos from './pages/Eventos'
import AchadosPerdidos from './pages/AchadosPerdidos'
import Contatos from './pages/Contatos'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="avisos" element={<Avisos />} />
          <Route path="cardapio" element={<Cardapio />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="grade" element={<GradeAulas />} />
          <Route path="mapa" element={<MapaEscola />} />
          <Route path="professores" element={<Professores />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="achados-perdidos" element={<AchadosPerdidos />} />
          <Route path="contatos" element={<Contatos />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
