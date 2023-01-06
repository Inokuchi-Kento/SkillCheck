import {useState, Dispatch, SetStateAction, useEffect, memo} from 'react'
import { supabase } from '../supabaseClient'
import './Acc.css'
import {ListOfSkill} from './ListOfSkill'

type Props = {
   id: number,
}

type List = {
    name: string
    skill_name: string
}

type SkillID = {
    skill_id: number
}

//スコアのアップダウンを操作
export const ListOfEmp = (props:Props) => {
    const [list, setList] = useState<List[]>([]);
    const [skillID, setSkillID] = useState<SkillID[]>([])
    const {id} = props;

    const dummy = id as unknown
    const label = dummy as string

    //DBからnameを取得する
    const fetchName = async() => {
        const { data, error } = await supabase.from('employees').select('name').eq('id', id)

        if(error) throw error;
        setList(data!);
    }

    const fetchSkillID = async() => {
        const {data: idData, error} = await supabase.from('skills').select('skill_id').limit(5)
        setSkillID(idData!)
    }

    useEffect(()=>{
        fetchName();
        fetchSkillID();
    },[])

    if (!list.length) return <div>missing data...</div>;

    return(
        <div>
            <input id={label} type="checkbox" className='acd-check'/>
            <label className='acd-label' htmlFor={label}>
                {list.map((item)=>item.name)}
            </label>

            <div className='acd-content'>
                {skillID.map((value)=>
                    <ListOfSkill emp_id = {id} skill_id={value.skill_id} key={value.skill_id}/>
                )}
                
            </div>
        </div>
    )
}