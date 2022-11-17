import { useState, useEffect } from "react";
import {EditScore} from './EditScore'
import {Send} from './Send'
import { supabase } from "../supabaseClient";
import { SaveScore } from "./SaveScore";

export function Edit() {
  return (
    <div className="App">
      <h5>ScoreControl</h5>
      <EditScore id={22}/>
      <EditScore id={350}/>
      <EditScore id={370}/>

      <div>
        <SaveScore/>
      </div>
    </div>
  );
}