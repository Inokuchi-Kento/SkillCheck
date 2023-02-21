import {useState, Dispatch, SetStateAction, useEffect, memo , ChangeEvent} from 'react'
import { supabase } from '../supabaseClient'
import './Acc.css'
import {ListOfSkill} from './ListOfSkill'

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
    const [selected, setSelected] = useState("");
    const {id, store_id} = props;

    console.log("id: ", id, "store_id: ", store_id)

    const dummy = id as unknown
    const label = dummy as string

    console.log("label: ", label)

    //DBからnameを取得する
    const fetchName = async() => {
        const { data, error } = await supabase.from('employees').select('name').eq('id', id)

        if(error) throw error;
        setList(data!);
        // console.log(list)
    }

    const fetchSkillID = async() => {
        const {data: idData, error} = await supabase.from('skills').select('skill_id').limit(5)
        setSkillID(idData!)
    }

    useEffect(()=>{
        fetchName();
        fetchSkillID();
    },[])

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value)
    }

    if (!list.length) return <div>missing data...</div>;

    

    return(
        <div>
            <input id={label} type="checkbox" className='acd-check' value={label} onChange={handleCheckboxChange}/>
            <label className='acd-label' htmlFor={label} key={label}>
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