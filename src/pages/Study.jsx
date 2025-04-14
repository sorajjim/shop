import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useStoreData } from '../hooks/useStoreData';

export default function ActionAreaCard() {
    const storeData = useStoreData()
  return (
    <>
    <div className='container' style={{ marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'space-evenly' }} onDragOver={(e)=>{dragEnter(e)}}>
        {
            storeData.data?.products?.map((product, index) => {
                return (
                    <Card id={'product'+index} key={index} sx={{ width: 250}} draggable={true} onDragStart={(e)=>drag(e)}>
                        <CardMedia
                        component="img"
                        height="140"
                        image={"./src/images/" + product.photo}
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
    
        <div style={{height: 260, display: 'flex', justifyContent: 'space-evenly'}} onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{dragEnter(e)}}>

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
    const draggedElement = document.getElementById(data);
    const clone = draggedElement.cloneNode(true); 
    clone.id = data + "_copy_" + Date.now(); // ID 중복 방지
    ev.target.appendChild(clone);
}
