import React, { useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Login from './Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddInfo from './AddInfo';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);



  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/AddInfo" element={<AddInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
