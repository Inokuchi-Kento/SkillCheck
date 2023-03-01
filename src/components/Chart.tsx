// 各種ライブラリのインポート
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

type ScoreList = {
    emp_id: number;
    skill_id: number;
    score: number
}

type EmpName = {
    name: string
}

type Props = {
    emp_id: number;
}

export function Chart(props: Props){
    const {emp_id} = props

    const [scoreList, setScoreList] = useState<ScoreList[]>([])
    const [name, setName] = useState<EmpName[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const{data, error} = await supabase.from("emp_skill").select("*").eq("emp_id", 10185696);
            if (error) {
                console.log(error);
                return;
            }

            const {data: namedata, error: nameError} = await supabase.from("employees").select("name").eq("id", emp_id)
            setScoreList(data!);
            setName(namedata!)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const transData = scoreList.map((score) => {
        return {
          skill: score.skill_id,
          score: score.score,
          employee: score.emp_id,
        };
    })

    console.log("data: ", transData)

    return (
            <div>
                {/* <h2>{name.map((item)=>item.name)}</h2> */}
                <RadarChart cx={250} cy={250} outerRadius={200} width={500} height={500} data={transData} >
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="skill" />
    
                    <PolarRadiusAxis angle={90} domain={[0, 3]}/>
    
                    <Radar name='Aさん' dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </div>
        );
}
    
       