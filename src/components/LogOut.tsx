import { useEffect, useState } from "react"; 
import { supabase } from "../supabaseClient";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function LogOut(){
    const navigate = useNavigate();
    
    const onSignOut = async()=> {
        try{
            const {error: logoutError} = await supabase.auth.signOut();
            if(logoutError) throw logoutError
            
            navigate("/SkillCheck/Login")
        }catch{
            alert("Logout error")
        }
    }

    useEffect(()=>{
        onSignOut()
    },[])

    return(
        <div className="logout">
            <div>
                ログアウトします
            </div>
        </div>
    )

}