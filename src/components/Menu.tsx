import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'
import veg from '../assets/seika.png'


export function Menu() {
    return (
        <div>
        <h3>メニュー画面</h3>
        <Link to={"/SkillCheck/search"}>
            <img src={veg}/>
        </Link>
        <div>
            <Link to={'/SkillCheck'}>ログアウト</Link>
        </div>
        </div>
    )
}