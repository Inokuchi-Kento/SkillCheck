import './App.css'
import {useEffect, useState} from 'react'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Menu} from './components/Menu'
import { Session } from '@supabase/gotrue-js';
import {supabase} from './supabaseClient'
import { SignUp } from './components/SignUp'
import { Profile } from './components/Profile'
import { LoginPage } from './components/Auth';
import { LogOut } from './components/LogOut';
import { Edit } from './components/Edit';
import { TestContents } from './components/TestContents';
import { NotFound } from './components/NotFound';

function App(){
  console.log('Appレンダリング')

  const menuItems = [
    { label: 'Home', link: '/SkillCheck/' },
    { label: `技能評価`, link: 'Edit'},
    { label : `従業員リスト`, link: '/SkillCheck/SearchForm'},
    { label : `ログアウト`, link: 'LogOut'}
  ];


  const [session, setSession] = useState<Session | null>(null);
  useEffect(()=>{
    setSession(supabase.auth.session())
    
    supabase.auth.onAuthStateChange((_event, session)=>{
      setSession(session)
    })
  },[])

  return(
    <div>
      {/* <HamburgerMenu menuItems={menuItems}/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/SkillCheck/' element={<Menu/>}/>
          <Route path='/SkillCheck/Test' element={<TestContents/>}/>
          <Route path='/SkillCheck/LoginPage' element={<LoginPage/>}/>
          <Route path='/SkillCheck/LogOut' element={<LogOut/>}/>
          <Route path='/SkillCheck/SignUp' element={<SignUp/>}/>
          <Route path='/SkillCheck/Edit' element={<Edit/>}/>
          <Route path="/SkillCheck/Profile" element={<Profile/>}/>
          <Route path='/SkillCheck/SearchForm' element={<SearchForm/>}/>
          <Route  path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;