import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'
import veg from '../assets/vegetable.png'
import { render } from "react-dom"
import Header from "./Header";

export function Menu() {
    return (
        <div>
            <Header />
        <h3>メニュー画面</h3>
        <Link to={"/SkillCheck/search"} id='veg' className='link'>
            <img src={veg}/>
        </Link>
        </div>
    )
}

