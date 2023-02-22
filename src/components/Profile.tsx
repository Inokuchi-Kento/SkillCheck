import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import logo from '../icons/largeLogo.png'
import { Header } from "./Header";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { supabase } from '../supabaseClient';


export const Profile = () => {
    type List ={
        name: string
    }

    const [list, setList] = useState<List[]>([]);
    
    const params = new URLSearchParams(location.search);
    const name = params.get('name');

    const fetchName = async() => {
        const { data, error } = await supabase.from('employees').select('name, role').eq('id', 22)
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