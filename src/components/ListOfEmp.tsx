import {useState, Dispatch, SetStateAction, useEffect, memo , ChangeEvent} from 'react'
import { supabase } from '../supabaseClient'
import {ListOfSkill} from './ListOfSkill'
import './ScoreEdit.css'

type Props = {
   id: number,
   store_id: number
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
    const {id, store_id} = props;

    console.log("id: ", id, "store_id: ", store_id)

    const dummy = id as unknown
    const id_label = dummy as string

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
            <input id={id_label} type="checkbox" className='acd-check'/> 

            <label className='acd-label' htmlFor={id_label}>
                {list.map((item)=>item.name)}
            </label>

            <div className='acd-content'>
                {skillID.map((value)=>
                    <ListOfSkill emp_id = {id}  skill_id={value.skill_id} key={value.skill_id}/>
                )}
            </div>
        </div>
    )
}