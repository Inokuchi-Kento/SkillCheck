import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'
import vegetable from '../icons/vegetable.png'
import fish from "../icons/fish.png"
import flesh from "../icons/flesh.png"
import sideDish from "../icons/sideDish.png"
import { render } from "react-dom"
import Header from "./Header";
import "./button.css"

export function Menu() {
    return (
        <div>
            <Header />
        <h3>メニュー画面</h3>
        <Link to={"/SkillCheck/search"}>
            <img src={vegetable} className="department"/>
        </Link>
        <Link to={"/SkillCheck/search"}>
            <img src={fish} className="department"/>
        </Link>
        <Link to={"/SkillCheck/search"}>
            <img src={flesh} className="department"/>
        </Link>    
        <Link to={"/SkillCheck/search"}>
            <img src={sideDish} className="department"/>
        </Link>
        </div>
    )
}

