import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import './SearchEmp.css'

type Emp = {
    id: number;
    name: string;
    kana: string;
    gender: string;
    role: string;
}

enum SortColumn {
    Id = 'id',
    Name = 'kana',
}

export function SearchEmp(){
    const [emp, setEmp] = useState<Emp[]>([]);
    const [input, setInput] = useState('')
    const [sortColumn, setSortColumn] = useState<SortColumn>(SortColumn.Id);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSortClick = (column: SortColumn) => {
        if (column === sortColumn) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortDirection("asc");
        }
    };
    
    function sortItems(items: Emp[], column: SortColumn, direction: "asc" | "desc") {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
          const aValue = column === SortColumn.Id ? a.id : a.name;
          const bValue = column === SortColumn.Id ? b.id : b.name;
          if (aValue < bValue) {
            return direction === "asc" ? -1 : 1;
          } else if (aValue > bValue) {
            return direction === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        });
        return sortedItems;
    }
      
    const onChangeNameText = (e:ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    useEffect(()=>{
        fetchEmp();
    },[sortColumn, sortDirection])

    const fetchEmp = async() => {
        const {data, error} = await supabase.from("employees").select("*").ilike("name", `%${input}%`).order(sortColumn, { ascending: sortDirection === "asc" ? true : false });
        if (error) {
            console.error(error);
        } else {
            const sortedItems = sortItems(data ?? [], sortColumn, sortDirection);
            setEmp(sortedItems);
        }
        setEmp(data!);
    }

    return(
        <div>
            <h2>検索テスト</h2>
            <input type="text" value={input} placeholder="検索ワードを入力" onChange={onChangeNameText}/>
            {/* <button onClick={fetchEmp}>Search</button> */}
            <button onClick={() => handleSortClick(SortColumn.Id)}>Sort by ID</button>
            <button onClick={() => handleSortClick(SortColumn.Name)}>Sort by Name</button>
            <table>
                <thead>
                    <th>ID</th>
                    <th>氏名</th>
                    <th>役職</th>
                </thead>
                {emp.map((item)=>(
                    <tbody key={item.id}>
                        <td>{item.id}</td>
                        <td>
                        <Link to = {{
                            pathname: '/SkillCheck/Profile', search: `?id=${item.id}`
                        }} className="route">
                            {item.name}
                        </Link>
                        </td>
                        <td>{item.role}</td>
                    </tbody>
                ))}
            </table>
        </div>
    )
}