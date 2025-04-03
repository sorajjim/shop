import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAge, changeName } from '../stores/userSlice';
import { deleteCart, increaseCount } from '../stores/cartSlice';
import { memo, useMemo, useState } from 'react';

const Child = memo(() => {
    console.log('재렌더링됨')
    return <div>자식임</div>
})

function Cart(){
    const state = useSelector((state)=> state)
    const carts = useSelector((state) => state.cart)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <Child></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <Button variant='light' onClick={()=>{
                dispatch(increaseAge(10))
            }}>버튼</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart)=>{
                            return (
                                <tr>
                                    <td>{cart.id}</td>
                                    <td>{cart.name}</td>
                                    <td>{cart.count}</td>
                                    <td><Button variant='light' onClick={()=>{
                                        dispatch(increaseCount(cart.id))
                                    }}>+</Button></td>
                                    <td><Button variant='danger' onClick={()=>{
                                        dispatch(deleteCart(cart.id))
                                    }}>x</Button></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;