import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
import {ShowColumn, List, FlattenedList, COLUMN} from "./EmployeeColumn";
import React from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { setMaxListeners } from 'events';

type Props = {
  nameText: string;
  nameTag: string;
  placeText: string;
  placeTag: string;
  roleText: string;
  roleTag: string;  
  sort: string;
}

const flattenList = (list: List[]) => {
  const listLength = list.length;
  //const tableListLength = tableList.length;
  const flattenedList: FlattenedList[] = [];
  
  for(let i: number = 0; i < listLength; i++){
    const employee: List = list[i];
    const extractRole: RegExp = /　.+$/
    const extractVegitable: RegExp = /青果　/
    flattenedList[i] = {id: employee.id,
                                          name: employee.name,
                                          gender: employee.gender,
                                          age: employee.age,
                                          kana: employee.kana,
                                          district_name: employee.districts.district_name,
                                          /*department_name: employee.departments.department_name,
                                          area_name: employee.areas.area_name,
                                          team_name: employee.teams.team_name,*/
                                          store_name: employee.stores.store_name,
                                          role: employee.role.match(extractRole)!.toString().replace("　", "")
                                                             .match(extractRole)!.toString().replace("　", "")
                                                             .match(extractRole)!//.toString().replace("　", "")
                                                             //.match(extractRole)!.toString().replace("　", "")
                                        };
  }
  return flattenedList;
}

const filteringWithPlace = (fList: FlattenedList) => {

}

/*const flattenObj = (list: List[]) => {
  const flattenArray = [];
  for(let i:number = 0; i < list.length; i++){
    let obj: List = list[i];
    for (const key in obj) {
      const keyOfList: keyof List = key;
      const str: string = obj[keyOfList].toString();
      const regexp: RegExp = /object/;
      if(regexp.test(str)){
        const nestedObj: List = obj[keyOfList];
        const flattened: List = {obj, ...nestedObj[keyOfList]};
        flattenArray[i] = flattened;
      }
    };
  }
  return flattenArray;
}*/
  
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

    console.log(props)

    //データを抽出する
    const getServeSideData = async() =>{  
      try {
        setLoading(true);


        let query = supabase.from('employees').select("*")
                                              .like(nameTag, "%" + nameText + "%")
                                              .like(roleTag, "%" + roleText + "%")
                                              .select("id, name, age, gender, kana, role," +
                                                      "districts(district_id, district_name)," +
                                                      //"departments(department_id, department_name)," +
                                                      //"areas(area_id, area_name)," +
                                                      "stores(store_id, store_name)")
                                              //.like(placeTag, "%" + placeText + "%")


        const {data, error} = await query;

        if (error) {
            throw error;
        }if (data) {
            setList(data);
            setFlattenedList(flattenList(list));
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