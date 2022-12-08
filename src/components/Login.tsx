import { useState } from "react"; 
// import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export function Login(){
    return(
        <div>
            <h1>test</h1>
        </div>
    )

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    // const onSignIn = async() => {
    //     try{
    //         const {error: loginError} = await supabase.auth.signIn({email, password})
    //         if(loginError) throw loginError;
    //         navigate("/SkillCheck/menu")
    //     }catch{
    //         alert("Login Error");
    //     }
    // }

    // const handleSubmit = (e:any) => {
    //     e.preventDefault();
    //     console.log({
    //       email,
    //       password,
    //     });
    // };

    // const handleChangeEmail = (e:any) => {
    //     setEmail(e.target.value);
    // };

    // const handleChangePassword = (e:any) => {
    //     setPassword(e.target.value);
    // };

    // return(
    //     <div className="App">
    //         <h3>ログイン</h3>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label htmlFor="email">Email</label>
    //                 <input 
    //                 id="email" 
    //                 name="email" 
    //                 value={email} 
    //                 onChange={handleChangeEmail} 
    //                 placeholder="Email"
    //                 />
    //             </div>
    //             <div>
    //             <label htmlFor="password">パスワード</label>
    //             <input
    //                 id="password"
    //                 name="password"
    //                 value={password}
    //                 onChange={handleChangePassword}
    //                 type="password"
    //                 placeholder="パスワード"
    //             />
    //             </div>
    //             <div>
    //                 <button type="submit" onClick={onSignIn}>ログイン</button>
    //             </div>
    //         </form>
    //         <div>
    //             <Link to={'/SkillCheck/SignUp'}>新規登録</Link>
    //         </div>
    //     </div>
    // )
}