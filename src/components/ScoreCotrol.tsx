import { useState, useEffect } from "react"; 
import { supabase } from "../supabaseClient";

type Props = {
    emp_id: number,
    skill_id: number,
    score: number
}

export const ScoreControl = (props: Props) => {
    const {emp_id, skill_id, score} = props 

    
    return(
        <div>
            test
        </div>
    )
}