import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
import {ShowColumn, List, FlattenedList, COLUMN} from "./EmployeeColumn";
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
    store_name: item.stores.store_name,
    role: item.role.match(extractRole)!
                       .toString()
                       .replace("　", "")
                       .replace("　兼　", "\n") //役職の2番目が表示されなくなる
                       .match(extractRole)!
                       .toString()
                       .replace("　", "")
                       .match(extractRole)!
  }))
  return transData;
}
  
export const ShowList = (props:Props) => { //function() の代わりに ()という無名関数を最初に生成して、後でShowListという名前をつけている。この仕様が重要らしい。
    const [list, setList] = useState<List[]>([]);
    const [flattenedList, setFlattenedList] = useState<FlattenedList[]>([]);
    const [loading, setLoading] = useState(true);
    const {nameText, 
           nameTag,
           placeText, 
           placeTag, 
           roleText, 
           roleTag, 
           sort} = props;
          
    const updateList = (data: any[]) => { //リファクタリング必要、と言うか純粋にカッコ悪い！
      const list: List[] = data;
      setList(list);
      return list;
    }

    const updataFlattenedList = (list: List[]) => {
      const flattenedList: FlattenedList[] = flattenList(list); 
      const fList: FlattenedList[] = flattenedList.filter((item) => (
          nullReplace(item[nameTag]).includes(nameText) 
          && nullReplace(item[placeTag]).includes(placeText) 
          && nullReplace(item[roleTag]).includes(roleText)
        ));
      setFlattenedList(fList);
    }

    console.log(props)

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
          updataFlattenedList(updateList(data));
        }
      } catch (error: any) {
            alert(error.message);
      } finally {
            setLoading(false);
      }
    };


    useEffect(() => {
      getServeSideData();
    }, [nameText, nameTag, placeText, placeTag, roleText, roleTag, sort]);

    if (loading) return <div>loading...</div>;
    // if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <table>
          {/*<ShowColumn list={list} column={ID} columnName = "社員番号"></ShowColumn>*/}
          <ShowColumn flattenedList={flattenedList} column={COLUMN.NAME} columnName = "氏名"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.KANA} columnName = "フリガナ"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.GENDER} columnName = "性別"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.AGE} columnName = "年齢"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.BLOCK} columnName = "ブロック"></ShowColumn>
          {/*<ShowColumn flattenedList={flattenedList} column={COLUMN.ZONE} columnName = "ゾーン"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.AREA} columnName = "エリア"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.TEAM} columnName = "チーム"></ShowColumn>*/}
          <ShowColumn flattenedList={flattenedList} column={COLUMN.STORE} columnName = "店舗"></ShowColumn>
          <ShowColumn flattenedList={flattenedList} column={COLUMN.ROLE} columnName = "役職"></ShowColumn>
         </table>
      </div> 
    );
};