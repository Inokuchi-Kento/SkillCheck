import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface User {
    id: string;
    email: string;
    store_id: number;
    user_name?: string; // オプショナルなプロパティに変更
}

export function User(){
    const [user, setUser] = useState<User[]>([]);

    const session = supabase.auth.session();

    if (!user) {
        return <div>Loading...</div>;
    }

    const fetchUser = async() => {
        const {data, error} = await supabase.from('users').select('*').eq('id', session?.user?.id) 
        setUser(data!)

        console.log("user: ", user);
    }

    if(session){
        fetchUser()
    }

    // useEffect(() => {
    //     const session = supabase.auth.session();
    //     setUser(session?.user ?? null);
    // }, []);

    // console.log("user: ", user);

    return (
        <div>
            {user.map((item)=>
            <div>
                <p>{item.id}</p>
                <p>{item.user_name}</p>
                <p>{item.store_id}</p>
            </div>
            )}
        </div>
    );
}