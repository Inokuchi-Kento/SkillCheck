import {useState, Dispatch, SetStateAction, useEffect} from 'react'
import {supabase} from '../supabaseClient'
import './Acc.css'

type Props = {
    id: number;
}

type List = {
    skill_name: string;
}
export const EditButton = (props: Props) => {
    const [score, setScore] = useState(0);
    const [list, setList] = useState<List[]>([])
    const {id} = props

    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase
        .from('skills')
        .select('skill_name')
        .eq('skill_id', 1)

        if(error) throw error;
        setList(data!)
    }
    
    //Supabaseのスコアを更新
    const sendScore = async() => {
        const {data, error} = await supabase
        .from('test')
        .update({"score": score})
        .eq('id',id)
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
            {list.map((item) => item.skill_name)}
            <button onClick={AddScore}>+</button>
            {score}
            <button onClick={DecScore}>-</button>
        </div>
    )
}