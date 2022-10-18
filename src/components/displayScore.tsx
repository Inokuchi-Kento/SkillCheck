import {supabase} from '../supabaseClient'
import {useState, useEffect} from 'react'

type  List = {
    score: number
}

export function DisplayScore(){
    console.log('displayレンダリング')
    const [score, setScore] = useState<List[]>([])

    const Score = async()=> {
        let { data, error } = await supabase
        .from('skills')
        .select('score')
        .eq('id',1)

        setScore(data!)
    }

    useEffect(() => {
        Score();
    }, [score]);

    return(
        <div>
           <table>
            <tbody>
                {score.map((item) => (
                <tr key={item.score}>
                    <td>{item.score}</td>
                </tr>
                ))}
            </tbody>
           </table>
        </div>
    )
}

