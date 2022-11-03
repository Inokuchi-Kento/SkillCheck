import {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient'

type Props = {
    score: number,
    id: number
}

//idとスコアとSupabaseに送信する
export function Send(props:Props){
    const {score, id} = props;

    const update = async()=>{
        const {data, error} = await supabase
        .from('test')
        .update({'score': score})
        .eq('id', id)

        if(error) throw error;
        else alert("送信完了")
        console.log()
    }

    return(
        <div>
            <button>送信</button>
        </div>
    )
}