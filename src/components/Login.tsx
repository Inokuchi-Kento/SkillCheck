import { Link, useNavigate } from "react-router-dom";
import {ChangeEvent, useState, MouseEvent} from 'react'

//仮ログインページ
export function LoginForm(){
    const [pass, setPass] = useState('')
    const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
    const navigate = useNavigate()
    
    const key = import.meta.env.VITE_REACT_APP_LOGIN_PASS

    const handleLogin = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(pass != key) {
            alert("パスワードが違います")
            navigate("/SkillCheck/")
        }else{
            navigate("/SkillCheck/menu")
        }
    }

    return(
        <div className="loginform">
            <form action="login">
                {/* <input type="text" placeholder="ID" name="mailAddress" /><br></br> */}
                <label>パスワード：</label>
                <input type="text" placeholder="パスワード" name="password" onChange={onChangeText}/><br></br>
                <button onClick={handleLogin}>ログイン</button>
                {/* <Link to={'/SkillCheck/menu'}>ログイン</Link>    */}
            </form> 
        </div>
    )
}