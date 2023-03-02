import {useState, Dispatch, SetStateAction, useEffect, memo , ChangeEvent} from 'react'
import { supabase } from '../supabaseClient'
import './List.css'
import {ListOfSkill} from './ListOfSkill'

type Props = {
   id: number,
   store_id: number
}

type Emp= {
    id: number
    name: string
}

type Skill = {
    skill_id: number
}

export function List() {
    const [emp, setEmp] = useState<Emp[]>([])
    const [skill, setSkill] = useState<Skill[]>([])

    const [selected, setSelected] = useState("");

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
    };

    const fetchEmpData = async() => {
        const {data: empdata, error} = await supabase.from('employees').select('*').limit(5)
        setEmp(empdata!)

        console.log("empdata: ", emp)
    }

    const fetchSkillData = async() => {
        const {data: skilldata, error} = await supabase.from('skills').select('*').limit(7)
        setSkill(skilldata!)

        console.log("skilldata: ", skill)
    }

    useEffect(()=>{
        fetchEmpData()
        fetchSkillData()
    },[])

    if (!emp.length) return <div>missing data...</div>;

    return(
        <div>
            {emp.map((item)=>(
                <div>
                <label className='acd-label' key={item.name}>
                    <input type="checkbox" value={item.name} checked={selected === item.name} onChange={handleCheckboxChange}/>
                    {item.name}
                </label>
                <div className='acd-content'>
                    {skill.map((value)=>(
                        <ListOfSkill emp_id={item.id} skill_id={value.skill_id} key={value.skill_id}/>
                    ))}
                </div>
                </div>
            ))}
        </div>
        
    )
}