import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./ Menu";

function App() {

  return (
    <div className="App">
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
