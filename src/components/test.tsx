import { supabase } from "../supabaseClient";
import { useEffect, useState, } from "react";

type User = {

}

export function Test(){
    const [emp, setEmp] = useState<User[]>([])

    const fetchData = async()=> { 
        const {data, error} = await supabase.from('employees').select("id, name, districts(district_id)").limit(5)
        console.log(data);
    } 

    return(
        <div>
            <button onClick={fetchData}> fetch </button>
        </div>
    )
}