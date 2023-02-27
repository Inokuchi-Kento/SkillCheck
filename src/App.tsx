import './App.css'
import {useEffect, useState} from 'react'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Menu} from './components/Menu'
import { Session } from '@supabase/gotrue-js';
import {supabase} from './supabaseClient'
import { SignUp } from './components/SignUp'
import { ScoreEdit } from './components/ScoreEdit';
import { Profile } from './components/Profile'
import { Test } from './components/test';
import { LoginPage } from './components/Auth';
import HamburgerMenu from './components/HamburgerMenu';
import { LogOut } from './components/LogOut';

function App(){
  console.log('Appレンダリング')

  const menuItems = [
    { label: 'Home', link: '/SkillCheck/' },
    { label: `技能評価`, link: '/SkillCheck/edit'},
    { label : `従業員検索`, link: '/SkillCheck/search'},
    { label : `ログアウト`, link: '/SkillCheck/logout'}
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
      <HamburgerMenu menuItems={menuItems}/>
      <BrowserRouter>
        <Routes>
          <Route path='/SkillCheck/Login' element={<LoginPage/>}/>
          <Route path='/SkillCheck/logout' element={<LogOut/>}/>
          <Route path='SkillCheck/signup' element={<SignUp/>}/>
          <Route path='/SkillCheck' element={<Test/>}/>
          <Route path='/SkillCheck/edit' element={<ScoreEdit/>}/>
          <Route path="/SkillCheck/profile" element={<Profile/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;