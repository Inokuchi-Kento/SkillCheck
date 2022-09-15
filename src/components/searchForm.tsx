import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {DisplayTable} from './Employees'
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";

export const SearchForm = ()=> {   
  //テキストボックスState
  const [text, setText] = useState('')
  const [word, setWord] = useState('')
  //セレクトボックスState
  const [tag, setTag] = useState('');
  const [cond, setCond] = useState('');

  if(tag == '') setTag('number')

  //テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  //検索項目の選択時に入力内容をStateに設定
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

  //ソート項目
  const [sort, setSort] = useState('number');
//   if (sort=='') setSort('number')
  const onChangeSort = (e:ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)

  //スコア入力項目
  const [skill, setSkill] = useState('fujitaEle')
  const onChangeSkill = (e:ChangeEvent<HTMLSelectElement>) => setSkill(e.target.value)

  //[検索]ボタン押下時の動作
  const onClickFetch = () => {
    if(text == ''){
        confirm("フィールドに値を入力してください")
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
      //ボタンの関数を埋め込む
      onClickFetch();
    }
  }

  return(
    <div>
      <h2>スキルチェック</h2>
      <div className='search_box'>
        <select name="column" id='tag' onChange={onChangeTag}>
          <option value="number" >社員番号</option>
          <option value="name">名前</option>        
          <option value="gender">性別</option>
        </select>
        <input type="text" id="fetch" value={text} placeholder="検索ワードを入力" onChange={onChangeText} onKeyPress={doType}/>
        <button id='serachButton' onClick={onClickFetch}>検索</button>
      </div>
      <h6></h6>
      <div className='sortbox'>
        並び替え
        <select name="item" id="sort" onChange={onChangeSort}>
          <option value="number" >社員番号</option>
          <option value="kana">名前</option>        
        </select>
      </div>
      <div className='scoreUpdete'>

        <select name="score" id="update" onChange={onChangeSkill}>
            <option value="fujitaEle">藤田式: 初級</option>
        </select>
      </div>
      <Link to={'/'}>ログアウト</Link>
      <div>
      <Link to={'/confirm'}>送信</Link>
      </div>
      
      <h5></h5>
      <DisplayTable sort={sort} tag={cond} text={word} />
    </div>
  );

}