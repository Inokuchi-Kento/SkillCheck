import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {SearchForm} from './searchForm'
import vegetable from '../icons/vegetable.png'
import fish from "../icons/fish.png"
import flesh from "../icons/flesh.png"
import sideDish from "../icons/sideDish.png"
import { render } from "react-dom"

import { Header } from "./Header";
import "./button.css"
import { supabase } from "../supabaseClient";

export function Menu() {
    const navigate = useNavigate()
    useEffect(()=>{
        const session = supabase.auth.session();
        if(!session){
            navigate("/SkillCheck/Login")
        }
    },[])

    return (
        <div>
            {/* <Header /> */}
            <h3>メニュー画面</h3>
            <Link to={"/SkillCheck/search"}>
                <img src={vegetable} className="department"/>
            </Link>
            <Link to={"/SkillCheck/edit"}>
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

