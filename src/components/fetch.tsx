import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

type Name = {
    name: string
}

export function Fetch() {
    const [name, setName] = useState<Name[]>([])

    const fetchName = async() => {
        const {data, error} = await supabase.from('employees').select('name').eq('id', 10214839) 
        setName(data!)
    }

    useEffect(()=>{
        fetchName()
    },[])

    return(
        <div>
            {name.map((value)=>value.name)}
        </div>
    )
}