import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./ Menu";
import { supabase } from './supabaseClient'

type List = { name:string }

function App() {
  
  const [list, setList] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("test")
  const get = async() =>{ 
    try {
      setLoading(true);
      let {data, error} = await supabase
      .from('employees')
      .select('name')
      if (error) throw error;
      if (data) setList(data)
    }
    catch (error:any) {
      alert(error.message)
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get()
  }, []);

  return (
    <div className="App">
      <div>
        <table>
          <thead>
            <tr>
              <td>名前
              </td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key = {item.name}>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>TRIAL</h1>
      <h2>生鮮スキルチェックシステム</h2>
      <div className="card">

      <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>


      <input type="text" placeholder="ID" name="mailAddress" /><br></br>
      <input type="text" placeholder="パスワード" name="password" /><br></br>

      
      <a href="http://localhost:5173/menu">
      <button type="button" >ログイン</button>
      </a>
        <p>
          TeamA <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
