import {useState, Dispatch, SetStateAction, useEffect, FC} from 'react'
import {supabase} from '../supabaseClient'
import './Acc.css'
import './skill.css'

type Props = {
    emp_id: number;
    skill_id: number;
}

export const Dummy = (props:Props) => {
    const {emp_id, skill_id} = props;

    return (
        <div>
            <button>-</button>
            {emp_id + " " +skill_id}
            <button>+</button>
            
        </div>
    )
}