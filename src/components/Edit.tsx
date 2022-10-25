import { useState } from "react";
import { Accordion } from "./Accordion";
import {EditScore} from './EditScore'
import {Send} from './Send'
import { supabase } from "../supabaseClient";

export function Edit() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <h5>EditTest</h5>
      <EditScore id={1}/>
    </div>
  );
}