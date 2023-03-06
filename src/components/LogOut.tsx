import { useEffect, useState } from "react"; 
import { supabase } from "../supabaseClient";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function LogOut(){
    const navigate = useNavigate();
    
    const onSignOut = async()=> {
        try{
            const {error: logoutError} = await supabase.auth.signOut();
            console.log("ログアウト");
            if(logoutError) throw logoutError
        }catch{
            alert("Logout Error")
        }

        if(!supabase.auth.session()){
            navigate("/SkillCheck/LoginPage")
        }else{
            alert("ログアウトできませんでした")
        }
    }

    useEffect(()=>{
        onSignOut()
    },[])

    return(
        <div className="logout">
            ログアウトします...
        </div>
    )

}