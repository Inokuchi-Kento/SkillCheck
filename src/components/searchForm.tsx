import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {DisplayTable} from './Employees'
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";
import { Header } from "./Header";
import logo from '../icons/largeLogo.png'

//検索画面のコンポーネント
export const SearchForm = ()=> {   
  //テキストボックスState
  const [text, setText] = useState('')
  const [word, setWord] = useState('')
  //セレクトボックスState
  const [tag, setTag] = useState('');
  const [cond, setCond] = useState('');

  if(tag == '') setTag('id')

  //テキスト入力
  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

  //ソート項目
  const [sort, setSort] = useState('id');
  const onChangeSort = (e:ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)

  //[検索]ボタン押下時の動作
  const onClickFetch = () => {
    if(text == ''){
        alert("フィールドに値を入力してください")
    }
    else{
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
      <img src={logo} className='logo'/>
      <Header />
      <h2>スキルチェック</h2>
      <div className='search_box'>
        <select name="column" id='tag' onChange={onChangeTag}>
          <option value="id" >社員番号</option>
          <option value="name">名前</option>        
          {/* <option value="store">店名</option> */}
        </select>
        <input type="text" id="fetch" value={text} placeholder="検索ワードを入力" onChange={onChangeText} onKeyPress={doType}/>
        <button id='serachButton' onClick={onClickFetch}>検索</button>
      </div>
      <h6></h6>
      <div className='sortbox'>
        並び替え
        <select name="item" id="sort" onChange={onChangeSort}>
          <option value="id" >社員番号</option>
          {/* <option value="kana">名前</option>       */}
        </select>
      </div>
      
      
      <Link to={'/SkillCheck/edit'}>スキル入力画面</Link>
      

      <h5></h5>
      <DisplayTable sort={sort} tag={cond} text={word} />
    </div>
  );

}