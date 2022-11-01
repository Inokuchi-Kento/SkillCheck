import './App.css'
import {useState} from 'react'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {LoginForm} from './components/Login'
import { Session } from '@supabase/gotrue-js';
import {Edit} from './components/Edit'
import {Header} from './components/Header'


function App(){
  console.log('Appレンダリング')
  const [session, setSession] = useState<Session | null>(null);

  return(
    <div>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck/" element={<Edit/>}/>
          <Route path="/SkillCheck/menu" element={<Menu/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
        {/* <Route path='/SkillCheck/edit' element={<EditScore/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;