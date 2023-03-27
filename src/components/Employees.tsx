import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
import {ShowColumn, List, FlattenedList, COLUMN, ScoreData, TrancedData} from "./EmployeeColumn";
import React from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { setMaxListeners } from 'events';
import { toFullWidthKatakana } from './kanaConverter';

type Props = {
  nameText: string;
  nameTag: string;
  placeText: string;
  placeTag: string;
  roleText: string;
  roleTag: string;  
  sort: string;
  asc: string;
}

const nullChecker = (a: any):boolean =>  ( a===null || a===undefined )
const nullReplace = (a: any):string => ( nullChecker(a) && "---" || a.toString() ); //a===undefined を加えると、roleで検索する時に「is not a function」のエラーが発生する。

const flattenList = (list: List[]) => {
 const extractRole: RegExp = /　.+$/
 const transData: FlattenedList[] = list.map((item) => (
  {
    id: item.id,
    name: item.name,
    gender: item.gender,
    age: item.age,
    kana: toFullWidthKatakana(item.kana),
    district_name: item.districts.district_name,
    /*department_name: item.departments.department_name,
    area_name: item.areas.area_name,
    team_name: item.teams.team_name,*/
    store_name: nullReplace(item.stores.store_name),
    role: nullReplace(item.role.match(extractRole)!
                       .toString()
                       .replace("　", "")
                       .replace("　兼　", "\n") //役職の2番目が表示されなくなる
                       .match(extractRole)!
                       .toString()
                       .replace("　", "")
                       .match(extractRole)!)
  }))
  return transData;
}
  
export const ShowList = (props:Props) => { //function() の代わりに ()という無名関数を最初に生成して、後でShowListという名前をつけている。この仕様が重要らしい。
    const [list, setList] = useState<List[]>([]);
    const [flattenedList, setFlattenedList] = useState<FlattenedList[]>([]);
    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState<ScoreData[]>([])
    const [trancedData, setTrancedData] = useState<TrancedData[]>([])
    const {nameText, 
           nameTag,
           placeText, 
           placeTag, 
           roleText, 
           roleTag, 
           sort,
           asc} = props;

    const getSkill = async(num: number) => {
        const {data, error} = await supabase.from("emp_skill")
                                          .select("*, employees(name), skills(skill_name, class_id)")
                                          .eq("skill_id", num);
          const skills:ScoreData[] = data!;
          return(skills) 
    }

    const tranceData = async (flattenedList: FlattenedList[]) => {
      const basicSkill: ScoreData[] = await getSkill(1); 
      const advanceSkill: ScoreData[] = await getSkill(2).then((s: ScoreData[]) => s); 
      const expertSkill: ScoreData[] = await getSkill(6).then((s: ScoreData[]) => s); 
      const coreSkill: ScoreData[] = await getSkill(12).then((s: ScoreData[]) => s); 
      const impGoods: ScoreData[] = await getSkill(17).then((s: ScoreData[]) => s); 
      const layout: ScoreData[] = await getSkill(18).then((s: ScoreData[]) => s); 
      const evening: ScoreData[] = await getSkill(19).then((s: ScoreData[]) => s); 
      const stock: ScoreData[] = await getSkill(7).then((s: ScoreData[]) => s); 
      const loss: ScoreData[] = await getSkill(8).then((s: ScoreData[]) => s); 
      const single: ScoreData[] = await getSkill(20).then((s: ScoreData[]) => s); 
      const multiple: ScoreData[] = await getSkill(21).then((s: ScoreData[]) => s);
      const profit: ScoreData[] = await getSkill(22).then((s: ScoreData[]) => s);
      const hr: ScoreData[] = await getSkill(23).then((s: ScoreData[]) => s);
      const hujitaBasic: ScoreData[] = await getSkill(3).then((s: ScoreData[]) => s);
      const hujitaAdvence: ScoreData[] = await getSkill(4).then((s: ScoreData[]) => s);
      const hujitaMiddle: ScoreData[] = await getSkill(5).then((s: ScoreData[]) => s); 
      const freshness: ScoreData[] = await getSkill(11).then((s: ScoreData[]) => s); 
      const t = flattenedList.map((item) => (
        {
        id:item.id,
        name:item.name,
        gender: item.gender,
        age: item.age,
        district_name: item.district_name,
        store_name: item.store_name,
        role: item.role,
        kana: item.kana,
        department_name: item.department_name,
        area_name: item.area_name,
        team_name: item.team_name,
        basicSkill: extractScore(basicSkill, item.id, "基礎知識"),
        advanceSkill: extractScore(advanceSkill, item.id, "応用技術"),
        expartSkill: extractScore(expertSkill,  item.id, "専門知識"),
        coreSkill: extractScore(coreSkill,  item.id, "コア技術"),
        impGoods: extractScore(impGoods, item.id, "重点商品"),
        layout: extractScore(layout, item.id, "レイアウト作成"),
        evening: extractScore(evening, item.id, "夕方満タン"),
        stock: extractScore(stock, item.id, "在庫"),
        freshness: extractScore(freshness, item.id, "鮮度チェック"),
        loss: extractScore(loss, item.id, "ロス"),
        single: extractScore(single, item.id, "単品管理"),
        multiple:extractScore(multiple, item.id, "複数管理"),
        profit: extractScore(profit, item.id, "収益化"),
        hr: extractScore(hr, item.id, "適正人事"),
        hujitaBasic: extractScore(hujitaBasic, item.id, "藤田式（初級）"),
        hujitaMiddle: extractScore(hujitaMiddle, item.id, "藤田式（中級）"),
        hujitaAdvance: extractScore(hujitaAdvence, item.id, "藤田式（上級）")
        }));
      setTrancedData(t);
    }

    const extractScore = (s: ScoreData[], id: number, skill: string):number => {
      const emp_score_data: ScoreData[] = s.filter(item => item.emp_id===id);
      /*const certain_skill: ScoreData[] = emp_score_data.filter(item => item.skills.skill_name===skill);
      console.log("certain_skill", certain_skill[0]);*/
      const score: number = emp_score_data[0].score;
      return(score);
    }

    const updateList = (data: any[]) => { //リファクタリング必要、と言うか純粋にカッコ悪い！
      const list: List[] = data;
      setList(list);
      return list;
    }
  
    const updateFlattenedList = (list: List[]):FlattenedList[] => {
      const flattenedList: FlattenedList[] = flattenList(list); 
      const fList: FlattenedList[] = flattenedList.filter((item) => (
          nullReplace(item[nameTag]).includes(nameText) 
          && nullReplace(item[placeTag]).includes(placeText) 
          && nullReplace(item[roleTag]).includes(roleText)
        ));
      return fList;
    }

    console.log(props);

    //データを抽出する
    const getServeSideData = async() =>{  
      try {
        setLoading(true);

        let query = supabase.from('employees')
                            .select("*")
                            .select("id, name, age, gender, kana, role," 
                            +"districts(district_id, district_name)," 
                            //+"departments(department_id, department_name)," 
                            //+"areas(area_id, area_name)," 
                            //+"teams(team_id, team_name),"
                            +"stores(store_id, store_name)")     

        const {data, error} = await query;

        if (error) {
          throw error;
        }if (data) {
          await tranceData(updateFlattenedList(updateList(data))); 
        }
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      } finally {
            setLoading(false);
      }
    };

    useEffect(() => {
      getServeSideData();
    }, [nameText, nameTag, placeText, placeTag, roleText, roleTag]);

    if (loading) return <div>loading...</div>;
    // if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <table>
          {/*<ShowColumn list={list} column={ID} columnName = "社員番号"></ShowColumn>*/}
          <ShowColumn trancedData={trancedData} column={COLUMN.NAME} columnName = "氏名" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.KANA} columnName = "フリガナ" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.GENDER} columnName = "性別" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.AGE} columnName = "年齢" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.BLOCK} columnName = "ブロック" sort={sort} asc={asc}></ShowColumn>
          {/*<ShowColumn trancedData={trancedData} column={COLUMN.ZONE} columnName = "ゾーン" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.AREA} columnName = "エリア" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.TEAM} columnName = "チーム" sort={sort} asc={asc}></ShowColumn>*/}
          <ShowColumn trancedData={trancedData} column={COLUMN.STORE} columnName = "店舗" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.ROLE} columnName = "役職" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.BASIC_SKILL} columnName = "基礎知識" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.ADVANCE_SKILL} columnName = "応用技術" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.EXPART_SKILL} columnName = "専門知識" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.CORE_SKILL} columnName = "コア技術" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.IMP_GOODS} columnName = "重点商品" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.LAYOUT} columnName = "レイアウト作成" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.EVENING} columnName = "夕方満タン" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.STOCK} columnName = "在庫" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.FRESHNESS} columnName = "鮮度チェック" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.LOSS} columnName = "ロス" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.SINGLE} columnName = "単品監理" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.MULTIPLE} columnName = "複数監理" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.PROFIT} columnName = "収益化" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.HR} columnName = "適正人事" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.HUJITA_BASIC} columnName = "藤田式（初級）" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.HUJITA_MIDDLE} columnName = "藤田式（中級）" sort={sort} asc={asc}></ShowColumn>
          <ShowColumn trancedData={trancedData} column={COLUMN.HUJITA_ADVANCE} columnName = "藤田式（上級）" sort={sort} asc={asc}></ShowColumn>
         </table>
      </div> 
    );
};