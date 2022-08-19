import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type List = {
    id: number;
    item:string;
};
  
function Select() {
    const [list, setList] = useState<List[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async() =>{
  
        try {
        setLoading(true);
    
        let { data, error } = await supabase
        .from<List>('skills')
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
  
    useEffect(() => {
      // supabaseからデータを取得
      fetchData();
    }, []);
    
    if (loading) return <div>loading...</div>;
    if (!list.length) return <div>missing data...</div>;
  
    return (
      <div className="Employee_List">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>ITEM</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Select;
  