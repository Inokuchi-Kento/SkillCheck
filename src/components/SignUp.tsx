import { useState } from "react";
import {supabase} from '../supabaseClient'
import { Link, useNavigate } from "react-router-dom";

export function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUp = async() => {
        try{
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            })
            if(signUpError) throw signUpError
        }catch(signUpError){
            alert('エラーが発生しました' + signUpError)
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log({
          email,
          password,
        });
    };

    const handleChangeEmail = (e:any) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e:any) => {
        setPassword(e.target.value);
    };

    return(
        <div className="App">
            <h3>新規登録</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChangeEmail} 
                    placeholder="Email"
                    />
                </div>
                <div>
                <label htmlFor="password">パスワード</label>
                <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    type="password"
                    placeholder="パスワード"
                />
                </div>
                <div>
                    <button type="submit" onClick={onSignUp}>登録</button>
                </div>
            </form>
            <div>
                <Link to={"/SkillCheck/"}>ログイン画面へ </Link>
            </div>
        </div>
    )
}

