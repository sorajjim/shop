import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useStoreData (){
    const result = useQuery({
        queryKey: ['storeData'],
        queryFn: ()=>
            axios.get('/store.json')
            .then((result) => {
                console.log('result ', result.data)
                return result.data
            })
    });
    return result
}