import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUsername(){
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

      return result
}