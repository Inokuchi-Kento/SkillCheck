import { useEffect, useState } from 'react'
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import './App.css'
import {supabase} from './supabaseClient'
import {DisplayTable} from './database/getAllData'

type scoreList = {
  id: number,
  employee_id: number,
  name: string,
  item: string,
  score: number;
}

function App():ReactElement{
  //テキストボックスState
  const [text, setText] = useState('')

  //テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return(
    <div>
      <h1>スキルチェック</h1>
      <input type="text" value={text} onChange={onChangeText}/>
      <DisplayTable/>
    </div>
  );
}

export default App;