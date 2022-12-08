import { useState, useEffect } from "react";
import {supabase} from '../supabaseClient'

type List = {
    item: string
}

type Props = {
    
}

export const FetchSkillName = () => {
    const [list, setList] = useState<List[]>([])
    //スキル名を取得
    const fetchItem = async() => {
        const {data, error} = await supabase
        .from('skills')
        .select('skill_name')

        if(error) throw error;
        setList(data!)
    }
}