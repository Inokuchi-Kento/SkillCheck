import { useEffect, useState ,FC } from 'react';
import { supabase } from '../supabaseClient';

type List = {
    id: number,
    employee_id: number,
    name: string,
    item: string,
    score: number;
};
  
export function DisplayTable() {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async() =>{
        try {
        setLoading(true);
    
        let { data, error } = await supabase
        .from<List>('scores')
        .select('*')
        .order('id')
    
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

    const DeleteData = async(props:any) => {
      const text = props;

      const { data, error } = await supabase
      .from('scores')
      .delete()
      .eq('item', "")
    }
  
    useEffect(() => {
      // supabaseからデータを取得
      fetchData();
    }, []);
    
    if (loading) return <div>loading...</div>;
    if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="name_skills">
        <button onClick={DeleteData}>削除</button>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>スキル一覧</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.employee_id}</td>
                <td>{item.name}</td>
                <td>{item.item}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
 
  