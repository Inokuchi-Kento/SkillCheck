import {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient'

type Props = {
    score: number,
    id: number
}

export function Send(props:Props){
    const {score,id} = props;
    const update = async()=>{
        const {data,error} = await supabase
        .from('skills')
        .update({'score': score})
        .eq('id', id)

        if(error) throw error;
    }

    return(
        <div>
            <button onClick={update}>送信</button>
        </div>
    )
}