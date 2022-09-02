import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {DisplayTable} from './selectData'
import { supabase } from '../supabaseClient';

export const SearchForm = ()=> {   
 
  //テキストボックスState
  const [text, setText] = useState('')
  const [word, setWord] = useState('')

  //セレクトボックスState
  const [tag, setTag] = useState('')
  const [cond, setCond] = useState('');

  if(cond=='') setCond('number');

  //テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  //セレクトボックス入力時に入力内容をStateに設定
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

  //[検索]ボタン押下時の動作
  const onClickFetch = () => {
    const newText = text;
    const newTag = tag;
    setWord(newText);
    setCond(newTag);
    setText("");
  }

  //Enterキー押下時の動作
  const doType = (event:KeyboardEvent) => {
    if(event.code == 'Enter'){
      onClickFetch();
    }
  }

  return(
    <div>
      <h2>スキルチェック</h2>
      <div className='search_box'>
        <input type="text" id="fetch" value={text} placeholder="検索ワードを入力" onChange={onChangeText} onKeyPress={doType}/>
        <select name="column" id='tag' onChange={onChangeTag}>
          <option value="number" >社員番号</option>
          <option value="name">名前</option>        
          <option value="department">役職</option>
          <option value="grade">グレード</option>
        </select>
        <button onClick={onClickFetch}>検索</button>
      </div>
      <DisplayTable tag={cond} text={word}/>
    </div>
  );

}