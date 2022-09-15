import { Link } from "react-router-dom";

export function LoginForm(){
    return(
        <div className="loginform">
            <input type="text" placeholder="ID" name="mailAddress" /><br></br>
            <input type="text" placeholder="パスワード" name="password" /><br></br>
            <Link to={'/menu/'}>ログイン</Link>    
        </div>
    )
}