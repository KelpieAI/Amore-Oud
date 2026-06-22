import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/his" element={<CategoryPage category="his" />} />
        <Route path="/hers" element={<CategoryPage category="hers" />} />
        <Route path="/unisex" element={<CategoryPage category="unisex" />} />
      </Routes>
    </BrowserRouter>
  )
}
