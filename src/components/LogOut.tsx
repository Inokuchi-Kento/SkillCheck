import { useState } from "react"; 
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

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

    return(
        <div className="logout">
            <div>
                <button type="submit" onClick={onSignOut}>ログアウト</button>
            </div>
        </div>
    )

}