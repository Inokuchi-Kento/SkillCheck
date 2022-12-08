import { useState, useEffect } from "react";
import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
// import { SaveScore } from "./SaveScore";

export function Edit() {
  return (
    <div className="App">
      <h3 className="tag">生鮮スキルチェック</h3>
      <ListOfEmp id={22}/>
    </div>
  );
}