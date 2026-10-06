import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'

// Lazy loading de todas as páginas — cada uma vira um chunk separado
// O navegador só baixa a página quando o usuário navegar para ela
const Home            = lazy(() => import('./pages/Home'))
const Avisos          = lazy(() => import('./pages/Avisos'))
const Cardapio        = lazy(() => import('./pages/Cardapio'))
const Calendario      = lazy(() => import('./pages/Calendario'))
const GradeAulas      = lazy(() => import('./pages/GradeAulas'))
const MapaEscola      = lazy(() => import('./pages/MapaEscola'))
const Professores     = lazy(() => import('./pages/Professores'))
const Eventos         = lazy(() => import('./pages/Eventos'))
const AchadosPerdidos = lazy(() => import('./pages/AchadosPerdidos'))
const Contatos        = lazy(() => import('./pages/Contatos'))

// Fallback leve enquanto a página carrega
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        <p className="text-sm text-slate-500">Carregando...</p>
      </div>
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="avisos" element={<Suspense fallback={<PageLoader />}><Avisos /></Suspense>} />
          <Route path="cardapio" element={<Suspense fallback={<PageLoader />}><Cardapio /></Suspense>} />
          <Route path="calendario" element={<Suspense fallback={<PageLoader />}><Calendario /></Suspense>} />
          <Route path="grade" element={<Suspense fallback={<PageLoader />}><GradeAulas /></Suspense>} />
          <Route path="mapa" element={<Suspense fallback={<PageLoader />}><MapaEscola /></Suspense>} />
          <Route path="professores" element={<Suspense fallback={<PageLoader />}><Professores /></Suspense>} />
          <Route path="eventos" element={<Suspense fallback={<PageLoader />}><Eventos /></Suspense>} />
          <Route path="achados-perdidos" element={<Suspense fallback={<PageLoader />}><AchadosPerdidos /></Suspense>} />
          <Route path="contatos" element={<Suspense fallback={<PageLoader />}><Contatos /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
