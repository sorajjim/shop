import { useState, useTransition } from "react"
    const a = new Array(1000).fill(0)
function Test() {
    const [name, setName] = useState('')
    const [isPending, startTransition] = useTransition()
    return (
        <div>
            <input onChange={(e)=>{
                    startTransition(()=>{
                        setName(e.target.value)
                    })
                }}/>
            {
                isPending ? '로딩중':
                a.map(()=>{
                    return <div>{name}</div>
                })
            }
        </div>
    )
}
 export default Test