// 各種ライブラリのインポート
import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import './Chart.css'
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

type ScoreList = {
    emp_id: number;
    skill_id: number;
    score: number
    employees: {
        name: string;
    };
    skills:{
        skill_name: string;
        class_id: number;
    }
}

type EmpName = {
    name: string
}

type Props = {
    emp_id: number;
}

export function Chart(props: Props){
    const skillClass = [
        {label: "基本", class_id: 101},
        {label: "展開", class_id: 102},
        {label: "商品管理1", class_id: 103},
        {label: "商品管理2", class_id: 104},
        {label: "損益", class_id: 104},
        {label: "藤田式", class_id: 201},
    ]

    const {emp_id} = props
    const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

    const [tag, setTag] = useState("101");
    const [scoreList, setScoreList] = useState<ScoreList[]>([])
    const [name, setName] = useState<EmpName[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const{data: scoredata, error} = await supabase.from("emp_skill").select("*, employees(name), skills(skill_name, class_id)").eq("emp_id", emp_id);
            const{data: namedata, error: nameError} = await supabase.from("employees").select("name").eq("id", emp_id);
            if (error) {
                console.log(error);
                return;
            }

            setScoreList(scoredata!);
            setName(namedata!);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const transData = scoreList.map((score) => {
        return {
            skill_id: score.skill_id,
            score: score.score,
            emp_id: score.emp_id,
            emp_name: score.employees.name,
            skill_name: score.skills.skill_name,
            class_id: score.skills.class_id,
        };
    });

    console.log("data: ", transData)

    const chartData = transData.filter((item)=>item.class_id === parseInt(tag))

    return (
            <div>
                <h2 className='emp_data'>
                    <span className='name'>{name.map((item)=>item.name)}  </span>
                    さんのデータ
                </h2>
                
                <RadarChart cx={320} cy={300} outerRadius={220} width={720} height={800} data={chartData} className="chart">
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="skill_name" />
    
                    <PolarRadiusAxis angle={90} domain={[0, 3]} tickCount={4}/>
    
                    <Radar name='Aさん' dataKey="score" stroke="red" fill="aqua" fillOpacity={0.4} />
                </RadarChart>

                <div className='selectbox-005' >
                    <select name="column" id='tag' onChange={onChangeTag}>
                    {skillClass.map((item)=>
                        <option value={item.class_id}>
                            {item.label}
                        </option>
                    )} 
                    </select>
                </div>
            </div>
        );
}
    
       