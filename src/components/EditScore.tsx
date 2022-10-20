import {useState, useEffect} from 'react'
import { supabase } from '../supabaseClient';
import {DisplayScore} from './displayScore'
import {Link} from 'react-router-dom'

type List = {
    score: number;
}

export const EditScore = () => {
    console.log('addレンダリング')
    const [score, setScore] = useState(0);
    
    const update = async()=>{
        const {data, error} = await supabase
        .from('skills')
        .update({'score': score})
        .eq('id',1)
    }

    const fetch = async() => {
        const {data, error} = await supabase
        .from('skills')
        .select('score')
    }

    const AddScore = () => {
        if(score>=3) return
        setScore(score + 1)
        console.log('add:' + score)
    }

    const DecScore = ()=> {
        if(score<=0) return
        setScore(score - 1)
        console.log('dec:' + score)
    }

    useEffect(()=>{
        fetch()
    },[])

    return(
        <div>
            <button onClick={AddScore}>+</button>
            {score}
            <button onClick={DecScore}>-</button>

            {/* <div>
                <button onClick={update}>
                    <Link to={'/SkillCheck/confirm'}>送信</Link>
                </button>
            </div> */}
        </div>
    )

}