import { useState, useEffect, ChangeEvent } from "react";
import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
import { SelectStore } from "./SelectStore";
import './img.css'
import './tab.css'
import './text.css'
import { Header } from "./Header";

type List = {
  id: number
  store_id: number
}

type StoreList = {
  store_id: number
  store_name :string
}

export function Edit() {
  const [list, setList] = useState<List[]>([])
  const [tag, setTag] = useState('113');
  const [storeList, setStoreList] = useState<StoreList[]>([])
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);

  const fetchID = async()=> {
      const {data: emp_id, error} = await supabase
      .from('employees')
      .select('id, store_id')
      .eq('store_id', parseInt(tag))
      .limit(10)

      setList(emp_id!)
  }

  const fetchStoreName = async()=> {
    const {data: storeData, error} = await supabase.from("stores").select("*")
    setStoreList(storeData!)
  }

  console.log("store: ", tag)

  useEffect(()=>{
    fetchID()
    fetchStoreName()
  },[])

  useEffect(()=>{
    fetchID()
  },[tag])

  return (
    <div>
      <Header />
      <div className="edit">
      <h2>技能評価</h2>
      <div className="store_search">

      </div>

        <span className="text">店舗選択</span>
          <div className='select'>
              <select name="column" id='tag' onChange={onChangeTag}>
                  {storeList.map((item)=>
                      <option value={item.store_id}>
                          {item.store_name}
                      </option>
                  )} 
              </select>
          </div>


          <div className="accordion-menu">
            {list.map((value)=>
              <ListOfEmp id={value.id} store_id={parseInt(tag)} key={value.id}/>
            )}
          </div>
      </div>
    </div>
  );
}