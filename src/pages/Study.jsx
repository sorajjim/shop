import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useStoreData } from '../hooks/useStoreData';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../stores/studyCartSlice';

export default function ActionAreaCard() {
    const storeData = useStoreData()
    const carts = useSelector((state) => state.studyCart)
    const dispatch = useDispatch()
  return (
    <>
    <div className='container' style={{ marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'space-evenly' }} onDragOver={dragEnter}>
        {
            storeData.data?.products?.map((product, index) => {
                return (
                    <Card 
                    id={'product'+index} 
                    key={index} 
                    sx={{ width: 250}} 
                    draggable={true} 
                    onDragStart={drag}
                    >
                        <CardMedia
                        component="img"
                        height="140"
                        image={"/shop/public/images/" + product.photo}
                        alt="green iguana"
                        draggable="false"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {product.brand}
                        </Typography>
                        <Typography variant="body2">
                            {product.price + ' 원'}
                        </Typography>
                        </CardContent>
                    </Card>
                )
            })
        }

    </div>
    {/* <h4>장바구니</h4> */}
    <div className='container' style={{backgroundColor: '#aaa7a7', height:300, padding:15}}>
    
        <div id='dropZone' style={{height: 260, display: 'flex', justifyContent: 'space-evenly'}} onDrop={drop} onDragOver={dragEnter}>

        </div>
    </div>
    </>
  );
}


function dragEnter(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("드래그 시작")
    ev.dataTransfer.setData("text", ev.target.id);
    
    console.log("text data:: " , ev.target.id)
}

function drop(ev) {
    ev.preventDefault();
    
    console.log("drop")
    let data = ev.dataTransfer.getData("text");
    console.log("drop data:: ", data)
    const productId = data.replace("product","")
    if(carts.find((a) => a.id == productId)) {
        
    }
    dispatch(setCartItem({id : productId, quantity : 1}))
    // const draggedElement = document.getElementById(data);
    // const clone = draggedElement.cloneNode(true); 
    // clone.id = data + "_copy"; // ID 중복 방지
    // clone.className += " cloneData"
    // // 카드 너비 유지
    // clone.style.width = "250px";
    // const cloneData = document.getElementsByClassName("cloneData")
    // console.log("cloneData:: ", cloneData)
    // // 항상 지정된 drop 영역에만 추가
    // const dropZone = document.getElementById("dropZone");
    // if (dropZone) {
    //     dropZone.appendChild(clone);
    // }
}
