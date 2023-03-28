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
    /*departments: Departments;
    areas: Areas;
    teams: Teams;*/
    stores: Stores;
    role: string;
}

interface Districts {
  district_id: number;
  district_name: string;
}

/*interface Departments {
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
}*/

interface Stores {
  store_id: number;
  store_name: string;
}

export interface ScoreData {
  score: number;
  emp_id: number;
  skill_id: number;
  skills:{
      skill_name: string;
      class_id: number;
  },
  employees:{
      name: string;
  }
}

export interface Scores {
  basicSkill: number;
  advanceSkill: number;
  expartSkill: number;
  coreSkill: number;
  impGoods: number;
  layout: number;
  evening: number;
  stock: number;
  freshness: number;
  loss: number;
  single: number;
  multiple: number;
  profit: number;
  hr: number;
  hujitaBasic: number;
  hujitaMiddle: number;
  hujitaAdvance: number;
  [key: string]: string | number 
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
  role: string;
  [key: string]: string | number
}

export interface TrancedData{
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
  role: string;
  basicSkill: number;
  advanceSkill: number;
  expartSkill: number;
  coreSkill: number;
  impGoods: number;
  layout: number;
  evening: number;
  stock: number;
  freshness: number;
  loss: number;
  single: number;
  multiple: number;
  profit: number;
  hr: number;
  hujitaBasic: number;
  hujitaMiddle: number;
  hujitaAdvance: number;
  [key: string]: string | number
}

export interface Score {
  score: number;
  emp_id: number;
  skill_id: number;
  skills:{
      skill_name: string;
      class_id: number;
  },
  employees:{
      name: string;
  }
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
  ROLE: "role",
  BASIC_SKILL: "basicSkill",
  ADVANCE_SKILL: "advanceSkill",
  EXPART_SKILL: "expartSkill",
  CORE_SKILL: "coreSkill",
  IMP_GOODS: "impGoods",
  LAYOUT: "layout",
  EVENING: "evening",
  STOCK: "stock",
  FRESHNESS: "freshness",
  LOSS: "loss",
  SINGLE: "single",
  MULTIPLE: "multiple",
  PROFIT: "profit",
  HR: "hr",
  HUJITA_BASIC: "hujitaBasic",
  HUJITA_MIDDLE: "hujitaMiddle",
  HUJITA_ADVANCE: "hujitaAdvance"
}

type Props = { 
    trancedData: TrancedData[];
    column: keyof TrancedData;
    columnName: string;
    sort: string;
    asc: string;
}

export const ShowColumn = (props: Props) => {

  const sortList = (a: FlattenedList, b: FlattenedList) => {
    if (a[props.sort].toString() < b[props.sort].toString()) return props.asc === 'asc' ? -1 : 1;
    if (a[props.sort].toString() > b[props.sort].toString()) return props.asc === 'asc' ? 1 : -1;
    return 0;
  };

  if(props.column === COLUMN.NAME){
    return (
      <td className="sticky_cloumn">
      <th className="sticky_row">{props.columnName}</th>
        {props.trancedData.sort(sortList).map((item) => (
          <tbody key={item.id}>
            <tr>
            <Link to={{ pathname: '/SkillCheck/Profile', search: `?id=${item.id}`}}>{item[props.column]}</Link>
            </tr>
          </tbody>
        ))}
    </td> 
    );
  } else {
    return (
      <td>
      <th className="sticky_row">{props.columnName}</th>
        {props.trancedData.sort(sortList).map((item) => (
          <tbody key={item.id}>
            <tr>{item[props.column]}</tr>
          </tbody>
        ))};
    </td>
    );
  };
};