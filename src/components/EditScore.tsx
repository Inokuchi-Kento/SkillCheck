import {useState, Dispatch, SetStateAction, useEffect, memo} from 'react'
import { supabase } from '../supabaseClient'
import './Acc.css'
import {EditButton} from './EditButton'

type Props = {
   id: number,
   setScoreList: Dispatch<SetStateAction<number>>
}

type List = {
    name: string
    skill_name: string
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
        const { data, error } = await supabase
        .from('employees')
        .select('name')
        .eq('id', id)

        if(error) throw error;
        setList(data!);
    }

    useEffect(()=>{
        fetchName();
    },[])

    if (!list.length) return <div>missing data...</div>;

    return(
        <div>
            <input id={label} type="checkbox" className='acd-check'/>
            <label className='acd-label' htmlFor={label}>
                {list.map((item)=>item.name)}
            </label>
            <div className='acd-content'>
                <EditButton emp_id = {id} skill_id={1}/>
                <EditButton emp_id = {id} skill_id={2}/>
                <EditButton emp_id = {id} skill_id={3}/>
                <EditButton emp_id = {id} skill_id={4}/>
                <EditButton emp_id = {id} skill_id={5}/>
            </div>
        </div>
    )
}