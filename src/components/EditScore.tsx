import {useState, Dispatch, SetStateAction, useEffect} from 'react'
import { supabase } from '../supabaseClient'

type Props = {
   id: number,
   setScoreList: Dispatch<SetStateAction<number>>
}

type List = {
    savedScore: number
    name: string
}

//スコアのアップダウンを操作
export const EditScore = (props:Props) => {
    const [list, setList] = useState<List[]>([]);
    const [score, setScore] = useState(0);
    const {setScoreList, id} = props;

    const dummy = id as unknown
    const label = dummy as string

    //DBからnameを取得する
    const fetchName = async() => {
        const {data, error} = await supabase
        .from("test")
        .select("*")
        .eq('id', id)

        if(error) throw error;
        setList(data!);
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
        setScoreList(score)
        console.log('add:' + score)
        if(score >= 3) return
        setScore((score)=>score + 1)
    }

    //スコア-
    const DecScore = ()=> {
        setScoreList(score)
        console.log('dec:' + score)
        if(score <= 0) return
        setScore((score)=>score - 1)
    }

    useEffect(()=>{
        fetchName();
    },[])

    useEffect(()=>{
        sendScore();
    },[score])

    if (!list.length) return <div>missing data...</div>;

    return(
        <div>
            <input id={label} type="checkbox" className='acd-check'/>
            <label className='acd-label' htmlFor={label}>
                {list.map((item)=>item.name)}
            </label>
            <div className='acd-content'>
                基礎知識
                <button onClick={AddScore}>+</button>
                {score}
                <button onClick={DecScore}>-</button>
            </div>
        </div>
    )
}