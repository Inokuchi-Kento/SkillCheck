import { useEffect, useState ,FC, ChangeEvent } from 'react';
import { supabase } from '../supabaseClient';

type List = {
  number: string,
  name: string,
  gender:string
}

type Props = {
  text: string;
  tag: string;
  sort: string;
}
  
//データの表示に関する関数
export function DisplayTable(props:Props) {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
    const {text, tag, sort} = props;

    console.log(props)

    //データを抽出する
    const fetchAllData = async() =>{  
      try {
        setLoading(true);

        //let query = supabase.from('test').select('*');

        let { data, error } = await supabase
        .from('test')
        .select('number, name, gender')
        // .order(sort)
        // .ilike(tag,'%'+text+'%')
        
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
      // supabaseからデータを取得
      fetchAllData();
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
              <td>性別</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.number}>
                {/* <td>{item.id}</td> */}
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  
 
  