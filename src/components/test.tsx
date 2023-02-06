import {useState, Dispatch, SetStateAction, useEffect, memo} from 'react'
import { supabase } from '../supabaseClient'
import './Acc.css'
import {ListOfSkill} from './ListOfSkill'

type List = {
    id: number
    name: string
    store_id: number
}

export function Test(){
    const [list, setList] = useState<List[]>([])

    const fetchName = async()=> {
        const {data: nameData, error} = await supabase
        .from("employees")
        .select('id, name')
        .eq("store_id", 0)

        console.log("namedata", nameData)
        setList(nameData!)

    }

    // useEffect(()=>{
    //     fetchName()
    // },[])

    return(
        <div>
            test 
            <button onClick={fetchName}>name</button>
            <div>
                <table>
                    <tbody>
                        {list.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}