import { useState } from "react";
import {EditScore} from './EditScore'
import {Send} from './Send'
import { supabase } from "../supabaseClient";
import logo from '../icons/largelogo.png'
import './img.css'

export function Edit() {
  const [scoreList, setScoreList] = useState(0);

  const list: number[] = new Array();

  const test = () => {
    alert("test")
  }

  return (
    <div className="App">
      <img src={logo} className='logo'/>
      <h2>スキル入力画面</h2>
      <div>
        <input type="button" id='pc' onClick={test} className='acd-check'/>
        <label htmlFor='pc' className="topc">pc版入力画面へ</label>
      </div>
      <EditScore setScoreList={setScoreList} id={1}/>
      <EditScore setScoreList={setScoreList} id={2}/>
      <EditScore setScoreList={setScoreList} id={3}/>
      {/* <Send score={scoreList} id={1}/> */}
    </div>
  );
}