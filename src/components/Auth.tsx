import { useState, useEffect } from "react"; 
import { supabase } from "../supabaseClient";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Session } from '@supabase/gotrue-js';

export function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);

    useEffect(()=>{
        const session = supabase.auth.session();
        if(session?.user){
            setRedirectHome(true)
        }
    },[])


}