import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'
import veg from '../assets/vegetable.png'

export function Menu() {
    return (
        <div>
        <h3>メニュー画面</h3>
        <Link to={"/SkillCheck/search"} id='veg' className='link'>
            <img src={veg}/>
        </Link>
        <div>
            <Link to={'/SkillCheck'}>ログアウト</Link>
        </div>
        </div>
    )
}

