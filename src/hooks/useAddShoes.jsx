import axios from "axios";
import { setShoes } from "../stores/shoesSlice";
import { useDispatch } from "react-redux";

export function useAddShoes(){
    const dispatch = useDispatch()
   
    const axiosShoes = () => {
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          console.log(result.data);
          dispatch(setShoes(result.data));
        })
        .catch(()=>{
          console.log("실패함ㅅㄱㄱ")
        })
    }
    return axiosShoes
}   