import { Link } from "react-router-dom";

export function Confirm(){
    return(
        <div>
            <h2>送信が完了しました</h2>
            <Link to={'/search'}>完了</Link>
        </div>
    )
}