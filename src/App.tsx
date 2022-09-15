import './App.css'
import { SearchForm } from './components/searchForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './components/Menu'
import {Confirm} from './components/Confirm'
import {LoginForm} from './components/Login'


function App(){
  return(
    <div>
      <h1>TRIAL</h1>
      <h3>生鮮スキルチェック</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/SkillCheck/" element={<LoginForm/>}/>
          <Route path="/menu/" element={<Menu/>}/>
          <Route path='/confirm' element={<Confirm/>}/>
          <Route path='/search' element={<SearchForm/>}/>
        </Routes>
      </BrowserRouter>
      {/* <SearchForm/> */}
    </div>
  );
}

export default App;