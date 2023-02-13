import './App.css'
import {useEffect, useState} from 'react'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {Login} from './components/Login'
import { Session } from '@supabase/gotrue-js';
import {Edit} from './components/Edit'
import { ExcelForm } from './components/ExcelForm';
import {supabase} from './supabaseClient'
import { SignUp } from './components/SignUp'
import { FetchTest } from './components/fetchTest';
import { Test } from './components/test';


function App(){
  console.log('Appレンダリング')
  const [session, setSession] = useState<Session | null>(null);
  useEffect(()=>{
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session)=>{
      setSession(session)
    })
  },[])

  return(
    <div>
      {/* <Header/> */}
      {!session ? 
        <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck" element={<Edit/>}/>
          <Route path="/SkillCheck/SignUp" element={<SignUp/>}/>
        </Routes>
        </BrowserRouter>
      :
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck" element={<Edit/>}/>
          <Route path="/SkillCheck/menu" element={<Menu/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
          <Route path="/SkillCheck/excelForm" element={<ExcelForm/>}/>
          <Route path='/SkillCheck/edit' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
      }
      
    </div>
  );
}

export default App;