import { useEffect, useState ,FC } from 'react';
import { useContext } from 'react';
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import {ShowList} from './Employees'
import { supabase } from '../supabaseClient';
import { Link } from "react-router-dom";
import { Header } from "./Header";
//import logo from '../icons/largeLogo.png';
import "./searchFormStyle.css";
import React from 'react';

export const SearchForm = () => {

  const [nameWord, setNameWord] = useState('');
  const [nameCond, setNameCond] = useState('');
  const [nameText, setNameText] = useState('')
  const [nameTag, setNameTag] = useState('name');
  const onChangeNameText = (e:ChangeEvent<HTMLInputElement>) => setNameText(e.target.value);
  const onChangeNameTag = (e:ChangeEvent<HTMLSelectElement>) => setNameTag(e.target.value);

  const [placeWord, setPlaceWord] = useState('')
  const [placeCond, setPlaceCond] = useState('');
  const [placeText, setPlaceText] = useState('')
  const [placeTag, setPlaceTag] = useState('district_name');
  const onChangePlaceText = (e:ChangeEvent<HTMLInputElement>) => setPlaceText(e.target.value);
  const onChangePlaceTag = (e:ChangeEvent<HTMLSelectElement>) => setPlaceTag(e.target.value);

  const [roleWord, setRoleWord] = useState('')
  const [roleCond, setRoleCond] = useState(''); 
  const [roleText, setRoleText] = useState('')
  const [roleTag, setRoleTag] = useState('role');
  const onChangeRoleText = (e:ChangeEvent<HTMLInputElement>) => setRoleText(e.target.value);
  const onChangeRoleTag = (e:ChangeEvent<HTMLSelectElement>) => setRoleTag(e.target.value);

  const [sort, setSort] = useState('kana');
  const onChangeSort = (e:ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)

  const onClickFetch = () => {
    if(nameText == ''){
      setNameText(".")
    }
    if(placeText == ''){
      setPlaceText(".")
    }
    if(roleText == ''){
      setRoleText(".")
    }
        const newNameText = nameText;
        const newnameTag = nameTag;
        setNameWord(newNameText);
        setNameCond(newnameTag);
        setNameText("");
        const newPlaceText = placeText;
        const NewPlaceTag = placeTag;
        setPlaceWord(newPlaceText);
        setPlaceCond(NewPlaceTag);
        setPlaceText("");
        const newRoleText = roleText;
        const newRoleTag = roleTag;
        setRoleWord(newRoleText);
        setRoleCond(newRoleTag);
        setRoleText("");      
  }

  //Enterキー押下時の動作
  const doType = (event:KeyboardEvent) => {
    if(event.code == 'Enter'){
      onClickFetch(); //ボタンの関数を埋め込む
    }
  }

  return(
    <div id="topBlock">
      <Header />
      <div className = "search_box">
      <h2>青果 従業員名簿</h2>
      <div className="search_box2">
        <div className = "condition_box">
        <div className="search_form">
          <select name="column" id='tag' onChange={onChangeNameTag}>
            <option value="name">名前</option>
          </select>
          <input type="text" className="inputForm" value={nameText} placeholder="検索ワードを入力" onChange={onChangeNameText} onKeyPress={doType} />
        </div>
        <div className="search_form">
          <select name="column" id="tag" onChange={onChangePlaceTag}>
            <option value="district_name">ブロック</option>
            {/*<option value="department_name">ゾーン</option>
            <option value="area_id">エリア・ライン</option>
            <option value="team_id">チーム</option>*/}
            <option value="store_name">店舗</option>
          </select>
          <input type="text" value={placeText} placeholder="検索ワードを入力"  className="inputForm" onChange={onChangePlaceText} onKeyPress={doType} />
        </div>
        <div className="search_form">
          <select role="column" id="tag" onChange={onChangeRoleTag}>
            <option value="役職">役職</option>
          </select>
          <input type="text" value={roleText} placeholder="検索ワードを入力"  className="inputForm" onChange={onChangeRoleText} onKeyPress={doType} />
        </div>
        <div className='sortbox'>
          並び替え
          <select name="item" id="sort" onChange={onChangeSort}>
            <option value="kana">名前</option>
            <option value="age">年齢</option>
            {/* <option value="date">グループ入社日</option>
            <option value="藤田式.初級">藤田式.初級</option>
            <option value="基礎知識">基礎知識</option>
            <option value="基礎技術">基礎技術</option>
            <option value="専門知識">専門知識</option>
            <option value="藤田式.中級">藤田式.中級</option>
            <option value="藤田式.上級">藤田式.上級</option>
            <option value="商品管理.在庫">商品管理.在庫</option>
            <option value="商品管理.ロス">商品管理.ロス</option>
            <option value="商品管理..適正発注">商品管理.適正発注</option>
            <option value="商品管理.鮮度チェック">商品管理.鮮度チェック</option>
            <option value="展開.9時間前陳列">展開.9時間前陳列</option>
            <option value="展開.夕方満タン">展開.夕方満タン</option>
            <option value="人時管.LSP作成">人時管.LSP作成</option>
            <option value="教育.AS教育">教育.AS教育</option>
            <option value="教育.コンプライアンス">教育.コンプライアンス</option>
            <option value="人間力.コニュニケーション">人間力.コニュニケーション</option>
            <option value="商品管理.商品知識">商品管理.商品知識</option>
            <option value="商品管理.係数管理">商品管理.係数管理</option>
            <option value="商品管理.販売計画">商品管理.販売計画</option>
            <option value="商品管理.クレーム対応L">商品管理.クレーム対応</option>
            <option value="展開.重点商品">展開.重点商品</option>
            <option value="展開.レイアウト作成">展開.レイアウト作成</option>
            <option value="展開.作業指示書">展開.作業指示書</option>
            <option value="人時管理.残業指示書">人時管理.残業指示書</option>
            <option value="人時管理.LSP管理">人時管理.LSP管理</option>
            <option value="教育.社員教育">教育.社員教育</option>
            <option value="教育.管理.単品">教育.管理.単品</option>
            <option value="人間力.リーダーシップ">人間力.リーダーシップ</option>
            <option value="粗利コントロール.値入管理">粗利コントロール.値入管理</option>
            <option value="粗利コントロール.地場仕入">粗利コントロール.地場仕入</option>
            <option value="粗利コントロール.ロス管理">粗利コントロール.ロス管理</option>
            <option value="計画作成">計画作成</option>
            <option value="損益管理.管理.複数">損益管理.管理.複数</option>
            <option value="損益管理.収益化">損益管理.収益化</option>
            <option value="損益管理.適正人時">損益管理.適正人時</option>
            <option value="コア技術">コア技術</option>
            <option value="基礎合計">基礎合計</option>
            <option value="専門合計">専門合計</option>
            <option value="総合計">総合計</option>*/}
          </select>
        </div>
        </div>
        <button id='serachButton' onClick={onClickFetch}>検索</button>
        </div>
      </div>
      <ShowList sort={sort} nameTag={nameCond} nameText={nameWord} placeTag={placeCond} placeText={placeWord} roleTag={roleCond} roleText={roleWord}/>
    </div>
    );
  }
