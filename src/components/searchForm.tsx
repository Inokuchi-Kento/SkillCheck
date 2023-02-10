import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {ShowList} from './Employees'
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";
import { Header } from "./Header";
import logo from '../icons/largeLogo.png';
import "./styles.css";

//検索画面のコンポーネント
export const SearchForm = ()=> {   
  const [text, setText] = useState('')
  const [word, setWord] = useState('')
  const [tag, setTag] = useState('');
  const [cond, setCond] = useState('');
  const [sort, setSort] = useState('id');

  if(tag == '') setTag('id')

  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);
  const onChangeSort = (e:ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)

  //[検索]ボタン押下時の動作
  const onClickFetch = () => {
    if(text == ''){
        alert("フィールドに値を入力してください")
    }else{
        const newText = text;
        const newTag = tag;
        setWord(newText);
        setCond(newTag);
        setText("");
    }
  }

  //Enterキー押下時の動作
  const doType = (event:KeyboardEvent) => {
    if(event.code == 'Enter'){
      onClickFetch(); //ボタンの関数を埋め込む
    }
  }

  return(
    <div>
      <Header />
      <div className = "search_box">
      <h2>青果 従業員名簿</h2>
        <select name="column" id='tag' onChange={onChangeTag}>
          <option value="id" >社員番号</option>
          <option value="name">名前</option>      
          <option value="管轄名">ブロック</option>      
          <option value="部署名">ゾーン</option>    
          <option value="課.DIV名">エリア・ライン</option>      
          <option value="センター・エリア名">チーム</option>
          <option value="店名">店舗</option>      
          {/* <option value="store">店名</option> */}
        </select>
        <input type="text" id="fetch" value={text} placeholder="検索ワードを入力" onChange={onChangeText} onKeyPress={doType}/>
        <button id='serachButton' onClick={onClickFetch}>検索</button>
        <div className='sortbox'>
        並び替え
        <select name="item" id="sort" onChange={onChangeSort}>
          <option value="id" >社員番号</option>
          <option value="kana">名前</option>      
        </select>
      </div>
    </div>
      <ShowList sort={sort} tag={cond} text={word} />
    </div>
  );
}