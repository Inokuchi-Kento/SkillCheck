import { useEffect, useState } from 'react'
import { ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import './App.css'
import {supabase} from './supabaseClient'
import {DisplayTable} from './components/selectData'
import { SearchForm } from './components/searchForm'

function App(){
  return(
    <div>
      <SearchForm/>
    </div>
  );
}

export default App;