import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Fonts from './pages/Fonts'
import CoffeeChat from './pages/CoffeeChat'
import Cv from './pages/Cv'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import TaispTips from './pages/TaispTips'
import TaisReadingRecs from './pages/TaisReadingRecs'
// import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fonts" element={<Fonts />} />
          <Route path="/coffee-chat" element={<CoffeeChat />} />
          <Route path="/coffee-chat-with-jess" element={<CoffeeChat />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/taisp-tips" element={<TaispTips />} />
          <Route path="/tais-reading-recs" element={<TaisReadingRecs />} />
          {/* Example route for future use - uncomment when needed:
          <Route path="/project/:id" element={<ProjectDetail />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
