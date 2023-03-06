import "./tableStyle.css";
import {Link} from "react-router-dom";
import React from "react";

export interface List {
    id: number;
    name: string;
    kana: string;
    gender: string;
    age: number;
    districts: Districts;
    departments: Departments;
    areas: Areas;
    teams: Teams;
    stores: Stores;
    role: string;
}

interface Districts {
  district_id: number;
  district_name: string;
}

interface Departments {
  department_id: number;
  department_name: string;
}

interface Areas {
  area_id: number;
  area_name: string;
}

interface Teams {
  team_id: number;
  team_name: string;
}

interface Stores {
  store_id: number;
  store_name: string;
}

export interface FlattenedList{
  id: number;
  name: string;
  kana: string;
  gender: string;
  age: number;
  district_name: string;
  /*department_name: string;
  area_name: string;
  team_name: string;*/
  store_name: string;
  role: RegExpMatchArray;
  [key: string]: string | number | RegExpMatchArray
}

interface COLUMN {
  [parameter: string]: keyof FlattenedList;
}

export const COLUMN: COLUMN = {
  ID:  "id", //string型じゃなくて keyof List型にするとIF分を使わずにitemのカラムの指定ができた、ブラケット記法をそのまま使用できないみたい。
  NAME:  "name",
  GENDER:  "gender",
  AGE:  "age",
  KANA:  "kana",
  BLOCK:  "district_name",
  /*ZONE: "department_name",
  AREA: "area_name",
  TEAM: "team_name",*/
  STORE: "store_name",
  ROLE: "role"
}

type Props = { //Propsを定義したらエラーが治った、何で？
    flattenedList: FlattenedList[];
    column: keyof FlattenedList;
    columnName: string;
}

export const ShowColumn = (props: Props) => {
  if(props.column === COLUMN.NAME){
    return (
      <td>
      <th>{props.columnName}</th>
        {props.flattenedList.map((item) => (
          <tbody key={item.id}>
            <tr>
            <Link to={{ pathname: '/SkillCheck/Profile', search: `?name="${item[props.column]}"` }}>{item[props.column]}</Link>
            </tr>
          </tbody>
        ))}
    </td> 
    );
  } else {
    return (
      <td>
      <th>{props.columnName}</th>
        {props.flattenedList.map((item) => (
          <tbody key={item.id}>
            <tr>{item[props.column]}</tr>
          </tbody>
        ))};
    </td>
    );
  };
};