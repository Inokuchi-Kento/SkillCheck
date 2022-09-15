import { useEffect, useState, Component } from 'react'
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import './App.css'
import {supabase} from './supabaseClient'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {Confirm} from './components/Confirm'
import {LoginForm} from './components/Login'
import { Link } from "react-router-dom";

function App(){
  // function LoginForm(){
  //   return(
  //       <div className="loginform">
  //           <input type="text" placeholder="ID" name="mailAddress" /><br></br>
  //           <input type="text" placeholder="パスワード" name="password" /><br></br>
  //           <Link to={'/menu/'}>ログイン</Link>    
  //       </div>
  //   )
  // }
  return(
    <div>
      <h1>TRIAL</h1>
      <h3>生鮮スキルチェック</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
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