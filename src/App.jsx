import { lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container,} from 'react-bootstrap'
import './App.css';

import { Routes, Route, useNavigate} from 'react-router-dom';

import MainPage from './pages/MainPage';
import { useUsername } from './hooks/useUsername';


const Detail = lazy(()=>import('./pages/Detail')) 
const Cart = lazy(()=>import('./pages/Cart'))
const Test = lazy(()=>import('./pages/Test'))

function App() {
  const navigate = useNavigate()
  const result = useUsername()
  return (
    <>
      <div className='App'>
      <div>
        { result.isLoading && '로딩중' }
        { result.error && '에러남' }
        { result.data && result.data.name }
      </div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=>{navigate("/")}}>ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate("/")}} >Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">반가워요 {result.data?.name}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Suspense fallback={<div>로딩중...</div>}>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<div>없는페이지에요</div>}/>
      </Routes>
    </Suspense>
      </div>
    </>
  )
}


export default App
