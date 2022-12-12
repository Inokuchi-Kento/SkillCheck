import { useState, useEffect } from "react";
import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
//import logo from '../icons/largelogo.png'
import { Link } from "react-router-dom";
import './img.css'

import { Header } from "./Header";



export function Edit() {
  return (
    <div className="App">
      {/* <img src={logo} className='logo'/> */}
      <Header />
      <h2>スキル入力画面</h2>
      <div>
        <Link to={'/SkillCheck/excelForm'} className="topc">pc版入力画面へ</Link>
      </div>
      <ListOfEmp id={22}/>
    </div>
  );
}