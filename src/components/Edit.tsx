import { useState, useEffect, ChangeEvent, memo } from "react";
import { supabase } from "../supabaseClient";
import './ScoreEdit.css'
import { Controller } from "./Controller";
import {Tabs} from "./Tab"
import EmpData from "../models/EmpData";
import StoreData from "../models/StoreData";
import {Link} from "react-router-dom";

interface User {
  id: number;
  email: string;
  store_id: number;
}

export function Edit() {
  console.log("Editレンダリング")
  const [isLoading, setIsLoading] = useState(true);
  const [emp, setEmp] = useState<EmpData[]>([]);
  const [stores, setStores] = useState<StoreData[]>([])
  const [tag, setTag] = useState('113');
  const [selected, setSelected] = useState('')
  const [user, setUser] = useState<User[]>([])

  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);
  const onChangeSelect = (e:ChangeEvent<HTMLInputElement>) => setSelected(e.target.value);

  // const fetchUserData = async() => {
  //   const session = supabase.auth.user();
  //   console.log('user_type: ', session!);

  //   if (session) {
  //     console.log(":", session.id)
  //     const { data: dbUser, error } = await supabase
  //       .from('users')
  //       .select('*') // 他の必要なプロパティを追加
  //       .eq('id', session.id)
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     setUser(dbUser!);
  //     setIsLoading(false);
  //   }
  // }

  // const userStoreID = parseInt(String(user.map((item) => item.store_id)))
  // console.log("store_id: ", userStoreID)

  // if(isLoading){
  //   return <div>Loading...</div>
  // }

  const fetchData = async () => {
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
    // fetchUserData();
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

  const filteredData = transData.filter((item)=>item.store_id === parseInt(tag))
  console.log("filterData: ", filteredData)

  return(
    <div>
    {/* <h1 className="acd-default">
            従業員を選択してください
    </h1> */}

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
      {filteredData.map((empItem)=>
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
                  {label: "商品管理1", content: <div> <Controller emp_id={empItem.id} class_id = {103}/></div>},
                  {label: "商品管理2", content: <div> <Controller emp_id={empItem.id} class_id = {105}/></div>},
                  {label: "損益管理", content: <div> <Controller emp_id={empItem.id} class_id = {104}/></div>},
                  {label: "藤田式", content: <div> <Controller emp_id={empItem.id} class_id = {201}/></div>},
              ]}/>
              <Link to={{ pathname: '/SkillCheck/Profile', search: `?id=${empItem.id}`}} className="to_profile">プロフィールページへ▶︎</Link>
          </div>
        </div>
      )}      
      </div>
      
    </div>
    </div>
  )
}