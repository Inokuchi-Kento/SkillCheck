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

function App(){
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return(
    <div>
      <h1>TRIAL</h1>
      <h3>生鮮スキルチェック</h3>
      {/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session?.user?.id} session={session} />}
    </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck/" element={<LoginForm/>}/>
          <Route path="/menu/" element={<Menu/>}/>
          <Route path='/confirm' element={<Confirm/>}/>
          <Route path='/search' element={<SearchForm/>}/>
        </Routes>
      </BrowserRouter>
      {/* <SearchForm/> */}
    </div>
  );
}

export default App;