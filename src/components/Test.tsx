import { useState, useEffect } from "react";
import {supabase} from "../supabaseClient"

type List = {
    emp_id: number,
    skill_id: number
    score: number
}

export function Test(){
    const [score, setScore] = useState<List[]>([])

    const fetchData = async() => {
        const {data, error} = await supabase
        .from("emp_skill")
        .select("*")
        .eq("emp_id", 756)
        .eq("skill_id", 1)

        if (error) throw error
        setScore(data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const newScore = score.map((item)=>item.score)
    console.log(parseInt(newScore.toString()))

    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}