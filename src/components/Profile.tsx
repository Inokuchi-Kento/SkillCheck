import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Chart } from './Chart';
import HamburgerMenu from './HamburgerMenu';
import menuItems from './MenuItems';

type List ={
    name: string;
    role: string;
}

type Score = {
    skills: Skills;
    score: number;
    emp_id: number;
}

type Skills = {
    skill_name: string;
}

export function Profile(){
    const navigate = useNavigate()
    useEffect(()=>{
        const session = supabase.auth.session();
        if(!session){
            navigate("/SkillCheck/LoginPage")
        }
    },[])
    
    const [list, setList] = useState<List[]>([]);
    const [score, setScore] = useState<Score[]>([]);
    
    const params = new URLSearchParams(location.search);
    const id = params.get('id')!.replaceAll('"', "");

    console.log("id: ",typeof(id))

    const fetchName = async() => {
        const { data, error } = await supabase.from('employees').select('*').eq('id', id)
        setList(data!); 
        console.log(list);
    }

    const fetchScore = async()=>{
        const {data, error} = await supabase.from("emp_skill").select("*, skills(skill_name)").eq("emp_id", id)
        if(error) console.log(error)
        
        setScore(data!)
        console.log("score: ", score)
    }

    const transData = score.map((item)=>{
        return{
            skill_name: item.skills.skill_name,
            score: item.score
        }
    })

    console.log("transData: ", transData)

    useEffect(() => {
        fetchName();
        fetchScore();
    }, []);

    return (
        <div>
            <HamburgerMenu menuItems={menuItems}/>
        <Tabs>
            {/* <img src={logo} className='logo'/> */}
            {/* <Header /> */}
            <TabList>
                <Tab>スキルデータ詳細</Tab>
                <Tab>社員詳細</Tab>

            </TabList>
            
            <TabPanel>
                <table className='score_table'>
                    <thead>
                        <th>技能項目</th>
                        <th>評点</th>
                    </thead>
                    {transData.map((data)=>
                    <tbody>
                        <td>{data.skill_name}</td>
                        <td>{data.score}</td>
                    </tbody>
                    )}
                </table>
                <Chart emp_id={parseInt(id)}/>
            </TabPanel>
            <TabPanel>
                <h2>名前</h2>
                <p>{list.map((emp) => emp.name)}</p>
                <h2>所属/勤務地/担当商品/職位</h2>
                <p>{list.map((emp)=>emp.role)}</p>
            </TabPanel>
        </Tabs>
        </div>
    )
}