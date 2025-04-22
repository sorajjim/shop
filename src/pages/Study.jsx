import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useStoreData } from '../hooks/useStoreData';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../stores/studyCartSlice';

export default function ActionAreaCard() {
    const storeData = useStoreData();
    const cartItems = useSelector((state) => state.studyCart.cartItem);
    const dispatch = useDispatch();
    const [selectVal,setSelectVal] = React.useState('');
    const changeSelectValue = (event) =>{
        setSelectVal(event.target.value) 
    };
    
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function dragEnter(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const productIndex = parseInt(data.replace("product", ""));
        const product = storeData.data.products[productIndex];

        const alreadyInCart = cartItems.find(item => item.id === product.id);
        if (!alreadyInCart) {
            dispatch(setCartItem({ id: product.id, photo:product.photo, title: product.title, price: product.price, quantity: 1 }));
        }
    }

    return (
        <>
            <div className='container' style={{ marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'space-evenly' }} onDragOver={dragEnter}>
                {storeData.data?.products?.map((product, index) => (
                    <Card
                        key={index}
                        id={'product' + index}
                        sx={{ width: 250 }}
                        draggable={true}
                        onDragStart={drag}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={"/shop/images/" + product.photo}
                            alt="green iguana"
                            draggable="false"
                        />
                        <CardContent>
                            <Typography variant="h5">{product.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{product.brand}</Typography>
                            <Typography variant="body2">{product.price} 원</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='container' style={{ backgroundColor: '#aaa7a7', height: 300, padding: 15 }}>
                <div id='dropZone' style={{ height: 260, display: 'flex', justifyContent: 'space-evenly' }} onDrop={drop} onDragOver={dragEnter}>
                    {cartItems.map((item, idx) => (
                        <Card key={item.id} sx={{ width: 250 }}>
                            <CardMedia
                            component="img"
                            height="140"
                            image={"/shop/images/" + item.photo}
                            alt={item.title}
                            draggable="false"
                            />  
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2">{item.price} 원</Typography>

                                <label>수량: </label>
                                <select 
                                //onChange 이벤트를 적용해서 select의 value에 입력(선택)된 값을 가져옴
                                    onChange={changeSelectValue}
                                    className='movie_side_select' id='sort_by'>           
                                         {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}     
                                    </select>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
