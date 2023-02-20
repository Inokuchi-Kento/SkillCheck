import {useState, Dispatch, SetStateAction, useEffect, memo, ChangeEvent} from 'react'
import { supabase } from '../supabaseClient'
import './Acc.css'
import {ListOfSkill} from './ListOfSkill'

type List = {
    id: number
    name: string
    store_id: number
    store_name: string
}

type StoreList = {
    store_id: number
    store_name :string
}

type ScoreList = {
    id: number
    name: string
    skills: Skills
}

type Skills = {
    skill_name: string
}

export function Test(){
    const [list, setList] = useState<List[]>([])
    const [storeList, setStoreList] = useState<StoreList[]>([])
    const [scoreList, setScoreList] = useState<ScoreList[]>([])
    const [skills, setSkills] = useState<Skills[]>([])
    const [tag, setTag] = useState('');

    const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

    const fetchName = async()=> {
        const idtag = parseInt(tag)
        const {data: nameData, error} = await supabase.from("employees").select('id, name, store_id').eq('store_id', idtag).limit(10)
        setList(nameData!)   
    }

    const fetchStoreName = async()=> {
        const {data: storeData, error} = await supabase.from("stores").select("*")
        setStoreList(storeData!)
    }

    const fetchScore = async() => {
        const {data: skilldata, error} = await supabase
        .from('employees')
        .select(`
            id,
            name,
            skills(
                skill_name
            ),
            emp_skill(
                score
            )
        `)
        .eq('id', 22)
        .limit(10)

        setScoreList(skilldata!)
        setSkills(scoreList.map((item)=>item.skills))

        console.log("typeof_emp: ", typeof(scoreList))
        console.log("typeof_skills: ", typeof(skills))

        console.log("emp: ", scoreList)
        console.log("skills: ", skills.map((values)=>values.skill_name))
    }

    useEffect(()=>{
        fetchStoreName()
    },[])

    return(
        <div className='skill'>
            <div className='select_store'>
                <select name="column" id='tag' onChange={onChangeTag}>
                    {storeList.map((item)=>
                        <option value={item.store_id}>
                            {item.store_name}
                        </option>
                    )} 
                </select>
            </div>

            <button onClick={fetchScore}>name</button>
            <table>
                <thead>
                    <tr>
                        <td>社員番号</td>
                        <td>名前</td>
                        <td>スコア</td>
                    </tr>
                </thead>
                <tbody>
                    {scoreList.map((item)=>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.skills.skill_name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}