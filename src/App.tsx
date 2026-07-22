import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Fonts from './pages/Fonts'
import Workflows from './pages/Workflows'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
// import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fonts" element={<Fonts />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Example route for future use - uncomment when needed:
          <Route path="/project/:id" element={<ProjectDetail />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
