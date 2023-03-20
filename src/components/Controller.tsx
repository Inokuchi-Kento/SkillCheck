import {useState, Dispatch, SetStateAction, useEffect, FC} from 'react'
import {supabase} from '../supabaseClient'
import './skill.css'
import './Controller.css'

type Score = {
    score: number;
    emp_id: number;
    skill_id: number;
    skills:{
        skill_name: string;
        class_id: number;
    },
    employees:{
        name: string;
        store_id: number;
    }
}

type Props = {
    emp_id: number,
    class_id: number
}

//<Controller emp_id = {} class_id = {}/>
export const Controller = (props: Props)=> {
    // console.log("controller_render")
    const {emp_id, class_id} = props;
    const [scoreData, setScoreData] = useState<Score[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchScoreData = async() => {
        const {data, error} = await supabase
        .from("emp_skill")
        .select("*, employees(name, store_id), skills(skill_name, class_id)")
        .eq("emp_id", emp_id)

        setScoreData(data!);

        // console.log("data: ", scoreData)
        setIsLoading(false);
    }
    useEffect(()=>{
        fetchScoreData();
    },[])

    const transData = scoreData.map((item)=>{
        return{
            score: item.score,
            emp_id: item.emp_id,
            emp_name: item.employees.name,
            skill_id: item.skill_id,
            skill_name: item.skills.skill_name,
            class_id: item.skills.class_id
        }
    })

    useEffect(()=>{
        fetchScoreData();
    },[transData])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const addScore = (skill_id: number) => {
        const filterItem = transData.filter((item)=> item.skill_id === skill_id)
        console.log("filter", filterItem.map((item)=>item.score));

        filterItem.map(async (item)=>{
            if(item.score >= 3) return
            const {error} = await supabase.from('emp_skill').update({'score': item.score + 1}).eq('emp_id', emp_id).eq('skill_id', skill_id)
        })
    }

    const decScore = (skill_id: number) => {
        const filterItem = transData.filter((item)=> item.skill_id === skill_id)
        console.log("filter", filterItem.map((item)=>item.score));

        filterItem.map(async (item)=>{
            if(item.score <= 0) return
            const {error} = await supabase.from('emp_skill').update({'score': item.score - 1}).eq('emp_id', emp_id).eq('skill_id', skill_id)
        })
    }

    // 指定されたclass_idと合致するデータのみを抽出
    const classData = transData.filter((item)=>item.class_id === class_id)

    return(
        <>
            <div className='skill'>
                {classData.map((item)=>
                    <div>
                        <table className='skill_table'>
                            <tbody>
                                <td className='skill_name'>{item.skill_name}</td>
                                <td className='skill_score'>{item.score}</td>
                                <td ><button className='dec_button' onClick={()=>decScore(item.skill_id)}>-</button></td>
                                <td ><button className='add_button' onClick={()=>addScore(item.skill_id)}>+</button></td>
                            </tbody>
                        </table>
                    </div>   
                )}
            </div>
        </>
    )
}
  
  
  