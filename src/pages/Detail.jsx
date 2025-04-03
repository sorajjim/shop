import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addCart } from "../stores/cartSlice";


function Detail(props){
  let [alert, setAlert] = useState(true)
  let [tab, setTab] = useState(0)
  
  useEffect(()=> {
      let a = setTimeout(()=> {
        setAlert(false)
      }, 2000)
     
      return()=>{
        // 기존 타이머는 제거
        clearTimeout(a)
      }
  }, [])
  

  let {id} = useParams();
  // 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결?
  // let 찾은상품 = props.shoes.find(function(x){
  //   return x.id == id
  // });
  let findGoodsId = props.shoes.find((x) => x.id == id )
  // console.log(findGoodsId);
  let urlId = findGoodsId != null ? parseInt(findGoodsId.id)+1 : null;
  useEffect(()=>{
    const addWatched = findGoodsId.id
    const watchedArr = JSON.parse(localStorage.getItem("watched")) || [];

    // 기존 배열에서 동일한 ID를 가진 요소를 제거
    const updatedArr = watchedArr.filter(item => item !== findGoodsId.id);

    // 새로운 요소 추가
    updatedArr.push(addWatched);

    // 로컬 스토리지 업데이트
    localStorage.setItem("watched", JSON.stringify(updatedArr)); 
    // if(watchedArr) {
    //   const watchedSome = watchedArr.some(item => item.id === findGoodsId.id)
    //   if(!watchedSome) {
    //     watchedArr.push(addWatched)
    //     localStorage.setItem('watched', JSON.stringify(watchedArr))
    //   }
    //   const watchedIndex = watchedArr.findIndex(obj => obj.id == findGoodsId.id)
    //   watchedArr.splice(watchedIndex, 1)
    //   watchedArr.push(addWatched)
    //   localStorage.setItem('watched',  JSON.stringify(watchedArr))
      
    // } else {
    //   localStorage.setItem('watched', JSON.stringify([addWatched]))
    // }
    
    
  }, [])
  return(
    <>
    <div>
      
      {
        alert == true 
        ? <div className="alert alert-warning" id="alert1">
          2초이내구매시 할인
        </div>
        : null
      }

    </div>
    {
      findGoodsId ? <DetailComponent urlId={urlId} findGoodsId={findGoodsId} tab={tab} setTab={setTab}/> : <div>페이지가 없습니다.</div>
    }
    </>
  )
}
function DetailComponent(props){
  const dispatch = useDispatch()
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+ props.urlId +".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
        <h4 className="pt-5">{props.findGoodsId.title}</h4>
        <p>{props.findGoodsId.content}</p>
        <p>{props.findGoodsId.price}원</p>
        <button className="btn btn-danger" onClick={()=>{
          dispatch(addCart(props.findGoodsId))
        }}>주문하기</button> 
        </div>
    </div>
    <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=> {
            props.setTab(0)
          }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{
            props.setTab(1)
          }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{
            props.setTab(2)
          }}>버튼2</Nav.Link>
        </Nav.Item>
    </Nav>
    <TabContent tab={props.tab}/>
    </div> 
  )
}
function TabContent(props){
  
  const [fade, setFade] = useState('');
  const content = ["내용0", "내용1", "내용2"];
  useEffect(()=>{
    const a = setTimeout(()=>{
      setFade('end')
    }, 10)

    return ()=> {
      clearTimeout(a)
      setFade('')
    }
  },[props.tab])
  return <div className={'start '+ fade}>{content[props.tab]}</div>;
}
export default Detail;