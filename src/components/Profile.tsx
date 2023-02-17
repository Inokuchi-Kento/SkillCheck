import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import logo from '../icons/largeLogo.png'
import { Header } from "./Header";
import "./Profile.css"
import { Link } from 'react-router-dom'

export const Profile = () => {
    
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