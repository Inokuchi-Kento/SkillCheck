import {} from 'react'
import "./styles.css";

type Props = {
    open: boolean;
    id: string;
}

export const Navigation = (props: Props) => {
    const {open, id} = props;

    return(
        <nav id={id} aria-hidden={!open} className='navigation'>
            <ul>
                <li>about</li>
                <li>works</li>
                <li>contact</li>
            </ul>
        </nav>
    )
}

