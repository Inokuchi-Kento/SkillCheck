import { useState, MouseEvent, FormEventHandler} from 'react'
import { supabase } from '../supabaseClient'

export function Auth(){
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(e:any)=>{
        e.preventDefault()

        try{
            setLoading(true)
            const {error} = await supabase.auth.signIn({email})
            if(error) throw error
            alert('Check your email for the login link!')
        }catch(error:any){
            alert(error.error_description || error.message)
        }finally{
            setLoading(false)
        }
    }

    const signInWithEmail = async()=>{
        try{
            setLoading(true)
            const {user, error} = await supabase.auth.signIn({
                email: 'example@email.com',
                password: 'aaaaaaa'
            })
            if(error) alert("login error")
        }catch(error:any){
            alert(error.error_description || error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget" aria-live="polite">
                <h1 className="header">TRIAL</h1>
                <p className="description">メールアドレスでサインイン</p>
                {loading ? (
                'Sending magic link...'
                ) : (
                <form onSubmit={signInWithEmail}>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    className="inputField"
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    className="inputField"
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button className="button block" aria-live="polite">
                    ログイン
                    </button>
                </form>
                )}
            </div>
        </div>
    )
}