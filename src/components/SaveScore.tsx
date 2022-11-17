import { useState, useEffect } from "react"; 
import {supabase} from '../supabaseClient'

type List = {
    id: number,
    emp_id: number,
    skill_id: number,
    score: number
}

export function SaveScore(){
    const [list, setList] = useState<List[]>([])

    return (
        <div>
            <button>保存</button>
        </div>
    )
}