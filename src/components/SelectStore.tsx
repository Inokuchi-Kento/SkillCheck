import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type StoreData = {
    store_id: number
    store_name: string
}

export const SelectStore = () => {
    const [storeName, setStoreName] = useState<StoreData[]>([])

    // 店舗データを取得
    const fetchStoreData = async() => {
        const {data: storeData, error} = await supabase
        .from("stores")
        .select("store_id")
        
        setStoreName(storeData!)
        console.log("store_id: ", storeName)
    }

    useEffect(()=>{
        fetchStoreData()
    },[])

    return (
        <div>
            <input type="checkbox" id="store_name"/>
            <label htmlFor="store_name">
                {storeName.map((item)=>
                    item.store_name
                )}
            </label>
        </div>
    )
}