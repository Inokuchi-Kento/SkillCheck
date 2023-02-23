import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
import {ShowColumn, List, COLUMN} from "./EmployeeColumn";
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

/*export const sortExtendedList = (exList: ExtendedList[], keyOfSort: string):ExtendedList[] => {
    return exList.sort((a, b) => 
      `${a[keyOfSort]}`.localeCompare(`${b[keyOfSort]}`) //変数aのデータ型がわからない時、とりあえずテンプレートリテラルを使えばstring型に統一できる。
    );
};*/
 
  
export const ShowList = (props:Props) => { //function() の代わりに ()という無名関数を最初に生成して、後でShowListという名前をつけている。この仕様が重要らしい。
    const [list, setList] = useState<List[]>([]);
    //const [extendedList, setExtendedList] = useState<ExtendedList[]>([]);
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

        let query = supabase.from('employees').select('*');

        query.like(nameTag, ".*").like(placeTag, "%" + placeText + "%").like(roleTag, "%" + roleText + "%").order(sort);

        const {data, error} = await query;

        if (error) {
          throw error;
        }if (data) {
          setList(data);

          /*const tempExtendedList: ExtendedList[] = list.map((item) => ({...item, furigana: toFullWidthKatakana(item.kana)}));
          console.log(tempExtendedList);*/
      }
      }catch (error: any) {
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
          {/*<ShowColumn list={extendedList} column={ID} columnName = "社員番号"></ShowColumn>*/}
          <ShowColumn list={list} column={COLUMN.NAME} columnName = "氏名"></ShowColumn>
          <ShowColumn list={list} column={COLUMN.KANA} columnName = "フリガナ"></ShowColumn>
          <ShowColumn list={list} column={COLUMN.GENDER} columnName = "性別"></ShowColumn>
          <ShowColumn list={list} column={COLUMN.AGE} columnName = "年齢"></ShowColumn>
         </table>
      </div> 
    );
};