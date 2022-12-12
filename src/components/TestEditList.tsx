import {supabase} from "../supabaseClient"
import { useEffect, useState } from "react"

type List = {
    id: number
    score: number
}

export function TestEditList(){
    const [list, setList] = useState<List[]>([])
    const [score, setScore] = useState(0) 

    const fetchSkill = async()=>{
        const {data: skillname, error} = await supabase.from('emp_skill').select('*')
        
        if(skillname) setList(skillname)
    }

    const ControlScore = async()=>{
        const {error} = await supabase.from('emp_skill').update({"score": score}).eq('id',6)
    }

    //スコア+
    const AddScore = () => {
        console.log('add:' + score)
        if(score >= 3) return
        setScore((score)=>score + 1)
    }

    //スコア-
    const DecScore = ()=> {
        console.log('dec:' + score)
        if(score <= 0) return
        setScore((score)=>score - 1)
    }

    useEffect(()=>{
        fetchSkill()
    },[])

    useEffect(()=>{
        ControlScore()
    },[score])

    return(
        <div>
            <h3>テスト</h3>
            <table>
                <thead>
                    <tbody>
                        {list.map((item)=>(
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <button onClick={DecScore}>-</button>
                                {item.score}
                                <button onClick={AddScore}>+</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                </thead>
            </table>
        </div>
    )
}