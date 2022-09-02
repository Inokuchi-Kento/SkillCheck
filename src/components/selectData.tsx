import { useEffect, useState ,FC } from 'react';
import { supabase } from '../supabaseClient';

type List = {
  id: number,
  number: string,
  name: string,
  department: string,
  grade: string;
}

type Props = {
  text: string;
  tag: string;
}
  
export function DisplayTable(props:any) {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
    const {text, tag} = props;
    console.log(props)
    
    //データを抽出する
    const fetchAllData = async() =>{  
      try {
        setLoading(true);

        let { data, error } = await supabase
        .from('employees')
        .select('*')
        .ilike(tag,'%'+text+'%')
        
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
    }, [text, tag]);
    
    if (loading) return <div>loading...</div>;
    if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <h5>検索テスト</h5>
        <h3>{text}の検索結果</h3>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>社員番号</td>
              <td>名前</td>
              <td>役職</td>
              <td>グレード</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  
 
  