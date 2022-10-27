import { useState } from "react";
import { Accordion } from "./Accordion";
import {EditScore} from './EditScore'
import {Send} from './Send'
import { supabase } from "../supabaseClient";

export function Edit() {
  const [scoreList, setScoreList] = useState(0);

  const list: number[] = new Array();

  return (
    <div className="App">
      <h5>ScoreControl</h5>
      <EditScore setScoreList={setScoreList} id={1}/>
      <EditScore setScoreList={setScoreList} id={2}/>
      <EditScore setScoreList={setScoreList} id={3}/>
      {/* <Send score={scoreList} id={1}/> */}
    </div>
  );
}