import {useState, Dispatch, SetStateAction, useEffect} from 'react'
import { isHtmlElement } from 'react-router-dom/dist/dom'
import { supabase } from '../supabaseClient'
import {Send} from './Send'

type Props = {
   id: number
}

type List = {
    name: string
}

//スコアのアップダウンを操作
export const EditScore = (props:Props) => {
    console.log('EditScoreレンダリング')
    const [score, setScore] = useState(0);
    const [name, setName] = useState<List[]>([]);
    const {id} = props;

    const fetchName = async() => {
        console.log("name取得")
        const {data, error} = await supabase
        .from("skills")
        .select("*")
        .eq('id', 1)

        if(error) throw error;
        setName(data!);
    }
    
    const AddScore = () => {
        console.log('add:' + score)
        if(score >= 3) return
        setScore((score) => score + 1)
    }

    const DecScore = ()=> {
        console.log('dec:' + score)
        if(score <= 0) return
        setScore((score) => score - 1)
    }

    useEffect(()=>{
        fetchName();
        console.log(name)
    },[])

    if (!name.length) return <div>missing data...</div>;

    return(
        <div>
            <h5>EditScoreTest</h5>
            
            <button onClick={AddScore}>+</button>
            {score}
            <button onClick={DecScore}>-</button>

            <Send score={score}/>
        </div>
    )

}