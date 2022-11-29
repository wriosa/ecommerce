import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'

function App() {
  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      {/* nuevo */}
      <Container className='my-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
