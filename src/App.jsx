import { createContext, useEffect, useState, lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container,} from 'react-bootstrap'
import './App.css';
import data from "./data";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"  

const Detail = lazy(()=>import('./pages/Detail')) 
const Cart = lazy(()=>import('./pages/Cart'))
const Test = lazy(()=>import('./pages/Test'))

function App() {
  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ['작명'],
    queryFn: () =>
      axios.get('http://codingapple1.github.io/userdata.json')
        .then((a) => {
          console.log('요청됨')
          return a.data
        }),
    staleTime: 2000
  });

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
        <Route path='/' element={<MainPage shoes={shoes} setShoes={setShoes} navigate={navigate}/>}/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<div>없는페이지에요</div>}/>
      </Routes>
    </Suspense>
      </div>
    </>
  )
}
function MainPage(props) {  
  return (
    <>
    <div className="main-bg"></div>
    <div className='container'>
      <div className='row'>
        {/* <GoodsCard shoes={shoes}/> */}
        {
          props.shoes.map((a) => {
            const shoeId = a.id + 1;
            const imgUrl = "https://codingapple1.github.io/shop/shoes" + shoeId + ".jpg";
            return (
              <div className='col-md-4' key={a.id} onClick={()=>{
                props.navigate('/detail/' + a.id)
              }}>
                <img src={imgUrl} width="80%" />
                <h4>{a.title}</h4>
                <p>{a.price}</p>
              </div>
            );
          })
        }
      </div>
    </div>
    <button onClick={()=>{
      axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result)=>{
        console.log(result.data);
        props.setShoes([...props.shoes, ...result.data]);
        
      })
      .catch(()=>{
        console.log("실패함ㅅㄱㄱ")
      })

    }}>더보기</button>
    </>
  );
}

export default App
