import React from "react";
import { Link } from "react-router-dom";
import {SearchForm} from './searchForm'

export function Menu() {
  return (
    <div>
      <h3>メニュー画面</h3>
      <Link to={"/search"}>青果</Link>
      <div>
        <Link to={'/'}>ログアウト</Link>
      </div>
    </div>
  )
}

