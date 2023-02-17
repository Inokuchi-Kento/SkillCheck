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

export const EditButton = (props: Props) => {
    const [score, setScore] = useState(0);
    const [list, setList] = useState<List[]>([])
    const {emp_id, skill_id} = props;

    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase
        .from('skills')
        .select('*')
        .eq('skill_id',skill_id)

        if(error) throw error;
        setList(data!)
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
        setScore((score)=>score + 1)
    }

    //スコア-
    const DecScore = ()=> {
        console.log('dec:' + score)
        if(score <= 0) return
        setScore((score)=>score - 1)
    }

    useEffect(()=>{
        fetchItem()
    }, [])

    useEffect(()=>{
        sendScore();
    },[score])

    return(
        <div>
            {list.map((item)=>item.skill_name)}
            <button onClick={DecScore}>-</button>
            {score}
            <button onClick={AddScore}>+</button>
        </div>
    )
}