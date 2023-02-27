import { useState, useEffect, FormEvent } from "react"; 
import { supabase } from "../supabaseClient";
import { SignUp } from "./SignUp";
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

    const HandleLogin = async(e: FormEvent)=> {
        e.preventDefault();
        const {error} = await supabase.auth.signIn({
            email,
            password
        })
        if(error){
            alert(error.message)
        }else{
            setRedirectHome(true)
        }
    }

    if(redirectHome){
        return <Navigate to = "/SkillCheck" replace/>
    }

    return (
        <div>
            <form onSubmit={HandleLogin}>
                <label htmlFor="">
                    <div>
                        Email:
                        <input type="email" name="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        パスワード:
                        <input type="password" name="password" value={password} placeholder="パスワード" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                </label>
                <button type="submit">ログイン</button>
            </form>
            <div className="sign-up">
                <Link to = {"/SkillCheck/signup"}>ユーザー登録はこちら</Link>
            </div>
        </div>
        
    )
}