import { useState, useEffect, ChangeEvent } from "react";
import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
import { SelectStore } from "./SelectStore";
//import logo from '../icons/largelogo.png'
import { Link } from "react-router-dom";
import './img.css'
import './tab.css'

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
  const [tag, setTag] = useState('');
  const [storeList, setStoreList] = useState<StoreList[]>([])
  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);


  const fetchID = async()=> {
      const {data: emp_id, error} = await supabase
      .from('employees')
      .select('id, store_id')
      .limit(10)

      setList(emp_id!)
  }

  const fetchStoreName = async()=> {
    const {data: storeData, error} = await supabase.from("stores").select("*")
    setStoreList(storeData!)
}

  useEffect(()=>{
    fetchID()
    fetchStoreName()
  },[])

  return (
    <div className="App">
      <Header />
      <h2>技能評価</h2>
      <div>
          <div className='select_store'>
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
              <ListOfEmp id={value.id} store_id={111} key={value.id}/>
            )}
          </div>
      </div>
    </div>
  );
}