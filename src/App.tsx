import './App.css'
import {useState} from 'react'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import { Session } from '@supabase/gotrue-js';
import {Edit} from './components/Edit'
import { ExcelForm } from './components/ExcelForm';
import { SignUp } from './components/SignUp'
import {Login} from './components/Login'
//import {Header} from './components/Header'

function App(){
  console.log('Appレンダリング')
  const [session, setSession] = useState<Session | null>(null);

  return(
    <div>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck" element={<LoginForm/>}/>
          <Route path="/SkillCheck/SignUp" element={<SignUp/>}/>

          <Route path="/SkillCheck/menu" element={<Menu/>}/>
          <Route path='/SkillCheck/search' element={<SearchForm/>}/>
          <Route path="/SkillCheck/excelForm" element={<ExcelForm/>}/>
          <Route path='/SkillCheck/edit' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;