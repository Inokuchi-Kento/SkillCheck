import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { ScoreControl } from "./ScoreControl";
import './ScoreEdit.css'
// import 'react-tabs/style/react-tabs.css';

type StoreList = {
    store_id: number
    store_name :string
}

type EmpList = {
    id: number
    name: string
}

type SkillList = {
    skill_id: number
}

export function ScoreEdit(){
    const navigate = useNavigate()
    useEffect(()=>{
        const session = supabase.auth.session();
        if(!session){
            navigate("/SkillCheck/Login")
        }
    },[])

    const [tag, setTag] = useState('113');
    const [selected, setSelected] = useState('')

    const [stores, setStores] = useState<StoreList[]>([])
    const [empList, setEmpList] = useState<EmpList[]>([])
    const [skills, setSkills] = useState<SkillList[]>([])

    const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);
    const onChangeSelect = (e:ChangeEvent<HTMLInputElement>) => setSelected(e.target.value);

    const fetchStoreData = async()=> {
        const {data: storeData, error} = await supabase.from("stores").select("*")
        setStores(storeData!)
    }

    const fetchEmpData = async() => {
        const {data: empData, error} = await supabase.from('employees').select('*').eq('store_id', parseInt(tag))
        setEmpList(empData!)

        console.log("empdata: ",empList)
    }

    const fetchSkillData = async() => {
        const {data: skillData, error} = await supabase.from('skills').select('*')
        setSkills(skillData!)
    }

    useEffect(()=>{
        fetchStoreData()
        fetchEmpData()
        fetchSkillData()
    },[])

    useEffect(()=>{
        fetchEmpData()
    },[tag])

    return(
        <div className="editer">
            {/* <Header/> */}
            <h2>技能評価</h2>

            {/* 店舗選択 */}
            <span className="test">店舗選択</span>
            <div className='select' >
                <select name="column" id='tag' onChange={onChangeTag}>
                    {stores.map((item)=>
                        <option value={item.store_id}>
                            {item.store_name}
                        </option>
                    )} 
                </select>
            </div>

            <div>
                {empList.map((empItem)=>
                    <div className="emp">
                        <input id={String(empItem.id)} type="checkbox" className="acd-check" value={String(empItem.id)} checked={selected===String(empItem.id)} onChange={onChangeSelect}/>
                        <label  htmlFor={String(empItem.id)} className="acd-label">
                            <table>
                                <tbody>
                                    <tr className="emp_id"> {empItem.id} </tr>
                                </tbody>
                                <tbody>
                                    <tr className="emp_name">{empItem.name}</tr>
                                </tbody>
                            </table>
                        </label>

                        <div className="acd-content">
                            <div key={empItem.id}>
                                {skills.map((skillItem) => (
                                    <ScoreControl
                                        key={`${empItem.id}_${skillItem.skill_id}`}
                                        emp_id={empItem.id}
                                        class_id={101}
                                        skill_id={skillItem.skill_id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}