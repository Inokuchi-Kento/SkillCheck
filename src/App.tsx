import './App.css'
import {useEffect, useState} from 'react'
import { supabase } from './supabaseClient'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {Confirm} from './components/Confirm'
import {LoginForm} from './components/Login'
import { Session } from '@supabase/gotrue-js';
import {Auth} from './components/Auth'
import {Account} from './components/Account'
import {UpdateScore} from './components/updateScore'
import { EditScore } from './components/addScore';
// import {EditScore} from './components/addScore'

function App(){
  console.log('Appレンダリング')
  const [session, setSession] = useState<Session | null>(null);

  return(
    <div>
      <h1>TRIAL</h1>
      <h3>生鮮スキルチェック</h3>
      {/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session?.user?.id} session={session} />}
    </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck/" element={<EditScore/>}/>
          <Route path="/SkillCheck/menu" element={<Menu/>}/>
          <Route path='/SkillCheck/confirm' element={<Confirm/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
          <Route path='/SkillCheck/update' element={<UpdateScore/>}/> 
        </Routes>
      </BrowserRouter>
      {/* <SearchForm/> */}
    </div>
  );
}

export default App;