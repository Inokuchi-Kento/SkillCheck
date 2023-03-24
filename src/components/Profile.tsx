import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import logo from '../icons/largeLogo.png'
import { Header } from "./Header";
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Chart } from './Chart';

type List ={
    name: string;
    role: string;
}

type Score = {
    score: number;
    emp_id: number;
}

export function Profile(){
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     const session = supabase.auth.session();
    //     if(!session){
    //         navigate("/SkillCheck/Login")
    //     }
    // },[])
    
    const [list, setList] = useState<List[]>([]);
    const [score, setScore] = useState<Score[]>([]);
    
    const params = new URLSearchParams(location.search);
    const name = params.get('name')!.replaceAll('"', "");

    const fetchName = async() => {

        const { data, error } = await supabase.from('employees').select('*').eq('name', name)
        setList(data!); 
        console.log(list);
    }

    const fetchScore = async()=>{
        const {data, error} = await supabase.from("emp_skill").select("*, skills(skill_name)").eq("emp_id", 10128353)

        if(error) console.log(error)
        setScore(data!)
    }

    useEffect(() => {
        fetchName();
        fetchScore();
      }, []);

    return (
        <Tabs>
            {/* <img src={logo} className='logo'/> */}
            {/* <Header /> */}
            <TabList>
                <Tab>名前</Tab>
                <Tab>スキル</Tab>
                <Tab>スキル詳細</Tab>
                <Tab>その他</Tab>
            </TabList>
            <TabPanel>
                <h2>名前</h2>
                <p>{name}</p>
                <h2>所属/勤務地/担当商品/職位</h2>
                <p>{list.map((emp)=>emp.role)}</p>
            </TabPanel>
            <TabPanel>
                <h2>スキル</h2>
                <p>{score.map((item)=>item.score)}</p>
                <p></p>
            </TabPanel>
            <TabPanel>
                <h2>スキル詳細</h2>
                <Chart emp_id={10128353}/>
            </TabPanel>
            <TabPanel>
                <h2>その他</h2>
            </TabPanel>
        </Tabs>
    )
}