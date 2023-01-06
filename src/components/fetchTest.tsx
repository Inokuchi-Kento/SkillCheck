import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

type List = {
    emp_id: number,
    name: string,
    employees: string[]
}

type employees = {
  name: string
}

export function FetchTest(){
    const [list, setList] = useState<List[]>([])

    const fetchData = async() => {
        const {data: empData, error} = await supabase
        .from('emp_store')
        .select(`
          emp_id,
          employees(
            name
          )
        `)
        .limit(10)

        
        setList(empData!)
        
        console.log(list)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div>
            <h3>fetch test</h3>

            <div className="name_skills">
        <table>
          <thead>
            <tr>
              <td>社員番号</td>
              <td>名前</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.emp_id}>
                <td>{item.emp_id}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
    )
}