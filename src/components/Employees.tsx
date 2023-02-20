import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
import {ShowColumn, List, ID, NAME, GENDER} from "./EmployeeColumn";

type Props = {
  nameText: string;
  nameTag: string;
  placeText: string;
  placeTag: string;
  roleText: string;
  roleTag: string;  
  sort: string;
}
  
export function ShowList(props:Props) {
    const [list, setList] = useState<List[]>([]);
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

        query = query.like(nameTag, "%" + nameText + "%").like(placeTag, "%" + placeText + "%").like(roleTag, "%" + roleText + "%").order(sort);

        const {data, error} = await query;

        if (error) {
            throw error;
        }if (data) {
            setList(data);
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
          {/*<ShowColumn list={list} column={ID} columnName = "社員番号"></ShowColumn>*/}
          <ShowColumn list={list} column={NAME} columnName = "氏名"></ShowColumn>
          <ShowColumn list={list} column={GENDER} columnName = "性別"></ShowColumn>
         </table>
      </div> 
    );
}