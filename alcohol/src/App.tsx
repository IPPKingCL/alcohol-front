import React, { useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Login from './Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddInfo from './Addinfo/AddInfo';
import FreeBoard from './Board/FreeBoard';
import FreeWrite from './Board/FreeWrite';
import FreeRead from './Board/FreeRead';
import FreeModify from './Board/FreeModify';
import Footer from './Common/Footer';
//import Main from './Main/main'

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/AddInfo" element={<AddInfo />}></Route>
        <Route path="/free" element={<FreeBoard />}></Route>
        <Route path="/free/write" element={<FreeWrite />}></Route>
        <Route path="/free/read/:id" element={<FreeRead />}></Route>
        <Route path="/free/modify/:id" element={<FreeModify />}></Route>
        {/*<Route path="/Main" element={<Main />}></Route>*/}
      </Routes>
      <Footer></Footer>
    </Router>
    
  );
}

export default App;
