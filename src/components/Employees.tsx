import { StringifyOptions } from 'querystring';
import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';
import "./tableStyle.css";
type List = {
  id: number
  name: string
  gender: string
}

type Props = {
  text: string;
  tag: string;
  sort: string;
}
  
export function ShowList(props:Props) {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
    const {text, tag, sort} = props;

    console.log(props)

    //データを抽出する
    const getServeSideData = async() =>{  
      try {
        setLoading(true);

        if(isNaN(parseInt(text))){
          var regex: number = parseInt(text)
        }

        let query = supabase.from('employees').select('*');

        switch (tag){
          case "id":
            query = query.eq(tag, text)
            break
            
          case "name":
            query = query.like(tag, "%" + text + "%")
            break
          
          case "gander":
            query = query.eq(tag, text)
        }

        // if(tag === 'number'){
        //     query = query.eq('number', text);
        // }else if(tag === 'gender'){
        //     query = query.eq('gender',text)
        // }else {
        //     query = query.ilike(tag, '%'+text+'%')
        // }
    
        if(sort){
            query = query.order(sort)
        }

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
    }, [text, tag, sort]);

    if (loading) return <div>loading...</div>;
    // if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <table>
          <td>
            <th>社員番号</th>
              {list.map((item) => (
                <tbody key={item.id}>
                  <tr>{item.id}</tr>
                </tbody>
              ))}
          </td>
          <td>
            <th>名前</th>
              {list.map((item) => (
                <tbody key={item.id}>
                  <tr>{item.name}</tr>
                </tbody>
              ))}
          </td>
          <td>
            <th>性別</th>
              {list.map((item) => (
                <tbody key={item.id}>
                  <tr>{item.gender}</tr>
                </tbody>
              ))}
          </td>
        </table>
      </div>
    );
}