import {useState} from 'react'
import { supabase } from '../supabaseClient';
import {DisplayScore} from './displayScore'

export const EditScore = () => {
    console.log('addレンダリング')
    const [score, setScore] = useState(0);

    const update = async()=>{
        const {data, error} = await supabase
        .from('skills')
        .update({'score': score})
        .eq('id',1)
    }

    const AddScore = () => {
        setScore(score + 1)
        console.log('add:' + score)
        update()
    }

    const DecScore = ()=> {
        setScore(score - 1)
        console.log('dec:' + score)
        update()
    }

    return(
        <div>
            <DisplayScore/>
            <button onClick={AddScore}>+</button>
            <button onClick={DecScore}>-</button>
        </div>
    )

}