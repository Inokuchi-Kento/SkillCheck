import './App.css'
import {useEffect, useState} from 'react'
import { supabase } from './supabaseClient'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {Confirm} from './components/Confirm'
import {LoginForm} from './components/Login'
import { Session } from '@supabase/gotrue-js';
import { EditScore } from './components/EditScore';
import {Test} from './components/test'

function App(){
  console.log('Appレンダリング')
  const [session, setSession] = useState<Session | null>(null);

  return(
    <div>
      <h1>TRIAL</h1>
      <h3>生鮮スキルチェック</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck/" element={<Test/>}/>
          <Route path="/SkillCheck/menu" element={<Menu/>}/>
          <Route path='/SkillCheck/confirm' element={<Confirm/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
          <Route path='/SkillCheck/edit' element={<EditScore/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;