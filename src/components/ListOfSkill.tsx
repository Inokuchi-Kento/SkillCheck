import {useState, Dispatch, SetStateAction, useEffect} from 'react'
import {supabase} from '../supabaseClient'
import './Acc.css'

type Props = {
    emp_id: number;
    skill_id: number;
    //skill_name: string
}

type List = {
    skill_name: string
}

type Score = {
    score: number
}

const key = 'count'

export const ListOfSkill = (props: Props) => {
    const [list, setList] = useState<List[]>([])
    const [scoreList, setScoreList] = useState<Score[]>([])
    const {emp_id, skill_id} = props;

    // const [score, setScore] = useState(()=>{
    //     const appState = localStorage.getItem(key);
    //     return appState ? JSON.parse(appState) : 0;
    // });

    // useEffect(() => {
    //     localStorage.setItem(key, JSON.stringify(score));
    // }, [key, score]);
    
    const [score, setScore] = useState(0);

    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase.from('skills').select('*').eq('skill_id', skill_id)

        if(error) throw error;
        setList(data!)
    }

    const fetchScore = async()=>{
        const {data: skillScore, error} = await supabase.from('emp_skill').select('score').eq('skill_id', skill_id)
        setScoreList(skillScore!)
    }
    
    //Supabaseのスコアを更新
    const sendScore = async() => {
        const {data, error} = await supabase
        .from('emp_skill')
        .update({"score": score})
        .eq('emp_id', emp_id)
        .eq('skill_id', skill_id)
    }

    //スコア+
    const AddScore = () => {
        console.log('add:' + score)
        if(score >= 3) return
        setScore(score + 1)
    }

    //スコア-
    const DecScore = ()=> {
        console.log('dec:' + score)
        if(score <= 0) return
        setScore(score - 1)
    }

    useEffect(()=>{
        fetchItem()
        fetchScore()
    }, [])

    useEffect(()=>{
        sendScore();
    },[score])

    return(
        <div>
            {list.map((item)=>item.skill_name)}
            <button onClick={DecScore} className="button-label">-</button>
            {score}
            <button onClick={AddScore} className="button-label">+</button>
        </div>
    )
}