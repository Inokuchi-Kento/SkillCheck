import { useState, useEffect, ChangeEvent } from "react";
// import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
import { SelectStore } from "./SelectStore";
import './ScoreEdit.css'
import { Header } from "./Header";
import { Controller } from "./Controller";
import {Tabs} from "./Tab"

type EmpData = {
  id: number;
  name: string;
  store_id: number;
  stores:{
    store_name: string;
  }
}

type StoreList = {
  store_id: number
  store_name :string
}

export function Edit() {
  const tabs = [
    {label: "基本", content: <div ><Controller emp_id={10016862} class_id = {101}/></div>,},
    {label: "藤田式", content: <div ><Controller emp_id={10016862} class_id = {201}/></div>,},
  ];

  const [emp, setEmp] = useState<EmpData[]>([]);
  const [stores, setStores] = useState<StoreList[]>([])
  const [tag, setTag] = useState('113');
  const [selected, setSelected] = useState('')

  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);
  const onChangeSelect = (e:ChangeEvent<HTMLInputElement>) => setSelected(e.target.value);

  const fetchData = async() => {
    const {data, error} = await supabase.from('employees').select('*, stores(store_name)').eq('store_id', tag);
    setEmp(data!)
  }

  const fetchStoreData = async()=> {
    const {data: storeData, error} = await supabase.from("stores").select("*")
    setStores(storeData!)
  }

  useEffect(()=>{
    fetchData();
    fetchStoreData();
  },[])

  useEffect(()=>{
    fetchData();
  },[tag])

  const transData = emp.map((item)=>{
    return{
      id: item.id,
      name: item.name,
      store_id: item.store_id,
      store_name: item.stores.store_name
    }
  })

  return(
    <div className="editer">
      <h2>技能評価</h2>
      <div className='select' >
        <select name="column" id='tag' onChange={onChangeTag}>
          {stores.map((item)=>
              <option value={item.store_id}>
                  {item.store_name}
              </option>
          )} 
        </select>
      </div>

      <div>
      {transData.map((empItem)=>
        <div className="emp">
          <input id={String(empItem.id)} type="checkbox" className="acd-check" value={String(empItem.id)} checked={selected===String(empItem.id)} onChange={onChangeSelect}/>
          <label  htmlFor={String(empItem.id)} className="acd-label">
              <table>
                  <tbody>
                      <tr className="emp_id"> {empItem.id} </tr>
                  </tbody>
                  <tbody>
                      <tr className="emp_name">{empItem.name}</tr>
                  </tbody>
              </table>
          </label>
          <div className="acd-content">
              <Tabs tabs={[
                  {label: "基本", content: <div> <Controller emp_id={empItem.id} class_id = {101}/></div>},
                  {label: "展開", content: <div> <Controller emp_id={empItem.id} class_id = {102}/></div>},
                  {label: "商品管理", content: <div> <Controller emp_id={empItem.id} class_id = {103}/></div>},
                  {label: "損益管理", content: <div> <Controller emp_id={empItem.id} class_id = {104}/></div>},
                  {label: "藤田式", content: <div> <Controller emp_id={empItem.id} class_id = {201}/></div>},
              ]}/>
          </div>
          {/* <div className="acd-content"> <Controller emp_id={empItem.id} class_id = {101}/></div> */}
        </div>
        
      )}

      {/* <div className="tab-contents">
          <Tabs tabs={[
              {label: "基本", content: <div> <Controller emp_id={22} class_id = {101}/></div>},
              {label: "藤田式", content: <div> <Controller emp_id={22} class_id = {201}/></div>},
          ]}/>
      </div> */}
      
      </div>

    </div>
  )
}