import { useState } from "react";
import {EditScore} from './EditScore'
import {Send} from './Send'
import { supabase } from "../supabaseClient";
import logo from '../icons/largelogo.png'
import { Link } from "react-router-dom";

import './img.css'
import Header from "./Header";

export function Edit() {
  const [scoreList, setScoreList] = useState(0);

  const list: number[] = new Array();

  return (
    <div className="App">
      <img src={logo} className='logo'/>
      <Header />
      <h2>スキル入力画面</h2>
      <div>
        <Link to={'/SkillCheck/excelForm'} className="topc">pc版入力画面へ</Link>
      </div>
      <EditScore setScoreList={setScoreList} id={22}/>
      <EditScore setScoreList={setScoreList} id={632}/>
      <EditScore setScoreList={setScoreList} id={690}/>
      {/* <Send score={scoreList} id={1}/> */}
    </div>
  );
}