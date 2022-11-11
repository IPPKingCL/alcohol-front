import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [isLogin, setIsLogin] = useState(false);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
