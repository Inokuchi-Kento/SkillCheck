import { useEffect, useState } from 'react'
import './App.css'
import {supabase} from './supabaseClient'
import SelectEmp from './database/Select_emp'
import SelectSkills from './database/Select_skills'

function App() {
  const [session, setSession] = useState(null)

  return(
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <SelectSkills/>
      <h1> </h1>
      <SelectEmp/>
    </div>
  )
}

export default App;
