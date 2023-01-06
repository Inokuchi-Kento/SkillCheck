import { useState, useEffect } from "react";
import {ListOfEmp} from './ListOfEmp'
import { supabase } from "../supabaseClient";
//import logo from '../icons/largelogo.png'
import { Link } from "react-router-dom";
import './img.css'
import './tab.css'

import { Header } from "./Header";

type List = {
  id: number
}

export function Edit() {
  const [list, setList] = useState<List[]>([])

  const fetchID = async()=> {
      const {data: emp_id, error} = await supabase
      .from('employees')
      .select('id')
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
      <h2>スキル入力画面</h2>
      <div>
        <ul className="tab-group">
          <li className="tab tab-A is-active">Tab-A</li>
          <li className="tab tab-B">Tab-B</li>
          <li className="tab tab-C">Tab-C</li>
        </ul>

        <div className="panel-group">
          <div className="panel tab-A is-show">
            {list.map((value)=>
              <ListOfEmp id={value.id} key={value.id}/>
            )}
          </div>
          <div className="panel tab-B">missing data</div>
        </div>
      </div>
      
    </div>
  );
}