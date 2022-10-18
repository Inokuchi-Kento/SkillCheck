import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';

type List = {
  number: string,
  name: string,
  store: string,
  basic: number
}

type Props = {
  text: string;
  tag: string;
  sort: string;
}
  
export function DisplayTable(props:Props) {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
    const {text, tag, sort} = props;

    console.log(props)

    //データを抽出する
    const getServeSideData = async() =>{  
      try {
        setLoading(true);

        let query = supabase.from('tr').select('*');

        if(tag === 'number'){
            query = query.eq('number', text);
        }else if(tag === 'gender'){
            query = query.eq('gender',text)
        }else {
            query = query.ilike(tag, '%'+text+'%')
        }
    
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
    if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <table>
          <thead>
            <tr>
              <td>社員番号</td>
              <td>名前</td>
              <td>店名</td>
              <td>基礎知識</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.number}>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.store}</td>
                <td>{item.basic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  
 
  