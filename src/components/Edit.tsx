import { useState, useEffect } from "react";
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

export function Edit() {
  const [list, setList] = useState<List[]>([])

  const fetchID = async()=> {
      const {data: emp_id, error} = await supabase
      .from('employees')
      .select('id, store_id')
      .limit(10)

      setList(emp_id!)
  }

  useEffect(()=>{
    fetchID()
  },[])

  return (
    <div className="App">
      {/* <img src={logo} className='logo'/> */}
      <Header />
      {list.map(()=>
         <SelectStore />
      )}
     
      
      <h2>スキル入力画面</h2>
      <div>
          <div >
            {list.map((value)=>
              <ListOfEmp id={value.id} store_id={111}  key={value.id}/>
            )}
          </div>
      </div>
    </div>
  );
}