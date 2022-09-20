import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {DisplayTable} from './Employees'
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";

export function UpdateScore() {
    const [score, setScore] = useState('0');
    const [text, setText] = useState('');
    const onChangeScore = (e:ChangeEvent<HTMLSelectElement>) => setScore(e.target.value);
    const onChangeText = (e:ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    console.log(score)

    //藤田式（初級）のスコアを書き換える
    const rewrite = async() => {
        const query = await supabase.from('test').update({'fujitaEle':score}).eq('store',text)
    }

    useEffect(()=> {
        rewrite();
    },[score])

    return(
        <div>
            <h1>スキル入力画面</h1>
            <div className='selectStore'>
                <input type="text" id="fetch" value={text} placeholder="検索ワードを入力" onChange={onChangeText}/>
            </div>
            <div className='selectScore'>
                藤田式（初級）のスコアを選択 - 
                <select name="item" onChange={onChangeScore}>
                    <option value="0" >0</option>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>   
                </select>
            </div>
            <Link to={'/SkillCheck/search'}>検索画面へ</Link>
        </div>
    )
}