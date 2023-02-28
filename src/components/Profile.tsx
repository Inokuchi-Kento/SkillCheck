import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import logo from '../icons/largeLogo.png'
import { Header } from "./Header";
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


export const Profile = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const session = supabase.auth.session();
        if(!session){
            navigate("/SkillCheck/Login")
        }
    },[])

    type List ={
        name: string;
        role: string;
    }

    const [list, setList] = useState<List[]>([]);
    
    const params = new URLSearchParams(location.search);
    const name = params.get('name');

    const fetchName = async() => {
        const { data, error } = await supabase.from('employees').select('*').eq('name', name)
        setList(data!); //
    }
    return (
        <Tabs>
            <img src={logo} className='logo'/>
            <Header />
            <TabList>
                <Tab>名前</Tab>
                <Tab>スキル</Tab>
                <Tab>スキル詳細</Tab>
                <Tab>その他</Tab>
            </TabList>
            <TabPanel>
                <h2>名前</h2>
                <p>{name}</p>
                <h2>部署/勤務地</h2>
                <h2>グレード</h2>
            </TabPanel>
            <TabPanel>
                <h2>スキル</h2>
            </TabPanel>
            <TabPanel>
                <h2>スキル詳細</h2>
            </TabPanel>
            <TabPanel>
                <h2>その他</h2>
            </TabPanel>
        </Tabs>
    )
}
  
export default Profile