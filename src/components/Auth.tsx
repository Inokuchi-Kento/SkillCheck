import { useState } from "react"; 
import {} from '../supabaseClient'

export function Auth(){
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<null | {email:string}>(null)
}