import { useEffect, useState } from 'react'
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import './App.css'
import {supabase} from './supabaseClient'
import {DisplayTable} from './components/selectData'
import { SelectBox } from './components/selectBox'

function App():ReactElement{
  //テキストボックスState
  const [text, setText] = useState('')
  const [word, setWord] = useState('')

  //セレクトボックスState
  const [tag, setTag] = useState('')
  const [cond, setCond] = useState('');

  //テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

  //[検索]ボタン押下時の動作
  const onClickFetch = () => {
    const newText = text;
    const newTag = tag;
    setWord(newText);
    setCond(newTag);
    setText("");
  }

  return(
    <div>
      <h2>スキルチェック</h2>
      <input type="text" value={text} onChange={onChangeText}/>
      <select name="column" id='tag' onChange={onChangeTag}>
        <option value="id">ID</option>
        <option value="name">名前</option>        
        <option value="department">役職</option>
        <option value="grade">グレード</option>
      </select>
      <button onClick={onClickFetch}>検索</button>
      <DisplayTable tag={cond} text={word}/>
    </div>
  );
}

export default App;