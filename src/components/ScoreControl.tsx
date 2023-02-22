import {useState, Dispatch, SetStateAction, useEffect, FC} from 'react'
import {supabase} from '../supabaseClient'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './skill.css'
import './ScoreEdit.css'

type Props = {
    emp_id: number;
    skill_id: number;
    class_id: number
}

type List = {
    skill_name: string
    class_id: number
}

type Score = {
    score: number
}

export const ScoreControl = (props: Props) => {
    // 社員IDとスキルIDをpropsとして受け取る
    const {emp_id, skill_id, class_id} = props;

    const [list, setList] = useState<List[]>([])
    const [score, setScore] = useState<Score[]>([])

    // console.log("props: ", skill_id)

    //レンダリング時にスキル名と現在のスコアを取得する
    useEffect(()=>{
        fetchItem()
        fetchScore()
    }, [])

    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase.from('skills').select('*').eq('skill_id', skill_id)//.eq('class_id', class_id)

        if(error) throw error;
        setList(data!)
        // console.log("skill_data: ", list)
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

    //スコア加算
    const increment = ()=> {
        const stringScore = score.map((item)=>item.score)
        const intScore = parseInt(String(stringScore))
        if(intScore>=3) return

        setScore(
            score.map((item)=>({
                ...item, score: item.score + 1
            }))
        )
        
        UpdateScore(intScore + 1)
    }

    //スコア減算
    const decrement = ()=> {
        const stringScore = score.map((item)=>item.score)
        const intScore = parseInt(String(stringScore))
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
        <div className='skill'>
            {list.map((item)=>
                <div>
                    <table className='skill_column'>
                        <tbody>
                            <td>{item.skill_name}</td>
                        </tbody>
                    </table>
            
                    <span className="skill_score">{"    " + score.map((item)=>item.score) + "    "}</span>
                    
                    <span className='score_button'>
                        <button onClick={decrement} className='add'>-</button>
                        <button onClick={increment} className='dec'>+</button>
                    </span>
                </div>
            )}
        </div>
    )
}