import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import {SearchForm} from './SearchForm'
import vegetable from '../icons/vegetable.png'
import fish from "../icons/fish.png"
import flesh from "../icons/flesh.png"
import sideDish from "../icons/sideDish.png"
import "./button.css"
import { supabase } from "../supabaseClient";
import HamburgerMenu from "./HamburgerMenu";
import menuItems from "./MenuItems";

// const menuItems = [
//     { label: 'Home', link: '/SkillCheck/' },
//     { label: `技能評価`, link: 'Edit'},
//     { label : `従業員リスト`, link: '/SkillCheck/SearchForm'},
//     { label : `ログアウト`, link: 'LogOut'}
// ];

export function Menu() {
    const navigate = useNavigate()
    useEffect(()=>{
        const session = supabase.auth.session();
        if(!session){
            navigate("/SkillCheck/LoginPage")
        }
    },[])

    return (
        <div>
            {/* <Header /> */}
            <HamburgerMenu menuItems={menuItems}/>
            <h3>メニュー画面</h3>
            <Link to={"/SkillCheck/SearchForm"}>
                <img src={vegetable} className="department"/>
            </Link>
            <Link to={"/SkillCheck/SearchForm"}>
                <img src={fish} className="department"/>
            </Link>
            <Link to={"/SkillCheck/SearchForm"}>
                <img src={flesh} className="department"/>
            </Link>    
            <Link to={"/SkillCheck/SearchForm"}>
                <img src={sideDish} className="department"/>
            </Link>
            <Link to = {"/SkillCheck/Edit"} color="blue">
                Edit
            </Link>
        </div>
    )
}

