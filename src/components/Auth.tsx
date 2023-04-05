import { useState, useEffect, FormEvent } from "react"; 
import { supabase } from "../supabaseClient";
import { Navigate } from "react-router-dom";
import './Auth.css'
import "./logo.css"
import logo from "../icons/smallLogo.png"

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
        <div className="login">
            <img src={logo} className="logo"/>
            <form onSubmit={HandleLogin} className='login-form'>
                <label >
                    <div>
                        <h3>Email</h3>
                        <input type="email" name="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="user"/>
                    </div>
                    <div>
                        <h3>パスワード</h3>
                        <input type="password" name="password" value={password} placeholder="パスワード" onChange={(e)=>setPassword(e.target.value)} className="user"/>
                    </div>
                </label>
                <button type="submit">ログイン</button>
            </form>
            <div >
                {/* <Link to = {"/SkillCheck/SignUp"} className="sign-up">ユーザー登録はこちら</Link> */}
            </div>
        </div>
    )
}