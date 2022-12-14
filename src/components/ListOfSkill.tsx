import {useState, Dispatch, SetStateAction, useEffect, FC} from 'react'
import {supabase} from '../supabaseClient'
import './Acc.css'

type Props = {
    emp_id: number;
    skill_id: number;
}

type List = {
    skill_name: string
}

type Score = {
    score: number
}

export const ListOfSkill = (props: Props) => {
    // 社員IDとスキルIDをpropsとして受け取る
    const {emp_id, skill_id} = props;

    const [list, setList] = useState<List[]>([])
    const [score, setScore] = useState<Score[]>([])

    //レンダリング時にスキル名と現在のスコアを取得する
    useEffect(()=>{
        fetchItem()
        fetchScore()
    }, [])

    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase
        .from('skills')
        .select('*')
        .eq('skill_id', skill_id)

        if(error) throw error;
        setList(data!)
    }

    //Supabaseから現在のスコアデータを取得する
    const fetchScore = async()=>{
        const {data, error} = await supabase
        .from('emp_skill')
        .select('score')
        .eq('skill_id', skill_id)
        .eq('emp_id', emp_id)

        if(error) console.log(error)
        setScore(data!)
    }

    const increment = ()=> {
        const stringScore = score.map((item)=>item.score)
        const intScore = parseInt(stringScore.toString())
        if(intScore>=3) return

        setScore(
            score.map((item)=>({
                ...item, score: item.score + 1
            }))
        )
        
        UpdateScore(intScore + 1)
    }

    const decrement = ()=> {
        const stringScore = score.map((item)=>item.score)
        const intScore = parseInt(stringScore.toString())
        if(intScore<=0) return

        setScore(
            score.map((item)=>({
                ...item, score: item.score - 1
            }))
        )
        

        UpdateScore(intScore - 1)
    }

    const UpdateScore = async(newScore: number)=>{
        const {error: updateError} = await supabase
        .from('emp_skill')
        .update({"score": newScore})
        .eq("emp_id", emp_id)
        .eq("skill_id", skill_id)
    }

    return(
        <div>
           {list.map((item)=>item.skill_name)}
           
           <button onClick={decrement}>-</button>
           {score.map((item)=>item.score)}
           <button onClick={increment}>+</button>
        </div>
    )
}