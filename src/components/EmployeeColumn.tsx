import "./tableStyle.css";
import {Link} from "react-router-dom";

export type List = {
    id: number;
    name: string;
    gender: string;
}

export const ID: keyof List = "id"; //string型じゃなくて keyof List型にするとIF分を使わずにitemのカラムの指定ができた、ブラケット記法をそのまま使用できないみたい。
export const NAME: keyof List = "name";
export const GENDER: keyof List = "gender";

type Props = { //Propsを定義したらエラーが治った、何で？
    list: List[];
    column: keyof List;
    columnName: string;
}

export function ShowColumn(props: Props){
  if(props.column === NAME){
    return (
      <td>
      <th>{props.columnName}</th>
        {props.list.map((item) => (
          <tbody key={item.id}>
            <tr>
            <Link to={{ pathname: '/SkillCheck/profile', search: `?name="${item[props.column]}"` }}>{item[props.column]}</Link>
            </tr>
          </tbody>
        ))}
    </td> 
    );
  } else {
    return (
      <td>
      <th>{props.columnName}</th>
        {props.list.map((item) => (
          <tbody key={item.id}>
            <tr>{item[props.column]}</tr>
          </tbody>
        ))}
    </td>
    );
  }
};