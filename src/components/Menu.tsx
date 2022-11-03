import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'
import veg from '../assets/vegitable.png'
import fle from '../assets/flesh.png'
import fis from '../assets/fish.png'
import sid from '../assets/sideDish.png'
import men from '../assets/menu.png'


export function Menu() {
    return (
        <div>
            <img src={men}/>
        <h3>メニュー画面</h3>
        <Link to={"/SkillCheck/search"}>
            <img src={veg}/>
        </Link>
            <img src={fle}/>
            <img src={fis}/>
            <img src={sid}/>
        <div>
            <Link to={'/SkillCheck'}>ログアウト</Link>
        </div>
        </div>
    )
}