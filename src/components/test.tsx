import { supabase } from "../supabaseClient";
import { useEffect, useState, } from "react";

type Emp = {
    name: string;
    districts: Districts;
}

type Districts = {
    district_name: string
}

export function Test(){
    const [emp, setEmp] = useState<Emp[]>([])

    const fetchData = async()=> { 
        let query = await supabase.from("employees").select("id, name, districts(district_id, district_name)").limit(5)
        const {data, error} = await supabase.from("employees").select("id, name, districts(district_id, district_name)").limit(5)
        setEmp(data!)

        console.log("query: ", query)
    } 

    useEffect(()=>{
        fetchData
    },[])

    useEffect(()=>{
        console.log("data: ", emp)
    },[emp])

    return(
        <div>
            <button onClick={fetchData}> fetch </button>
        </div>
    )
}