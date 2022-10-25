import {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient'

type Props = {
    score: number,
}

//idとスコアとSupabaseに送信する
export function Send(props:Props){
    const {score} = props;

    const update = async()=>{
        const {data, error} = await supabase
        .from('skills')
        .update({'score': score})

        if(error) throw error;
        else console.log('送信完了')
    }

    return(
        <div>
            <button onClick={update}>送信</button>
        </div>
    )
}