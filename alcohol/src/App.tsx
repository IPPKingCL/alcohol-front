import React, { useEffect, useState } from 'react';
import './css/App.css';
import './css/image.css';
import Login from './Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  ScrollRestoration,
} from "react-router-dom";
import AddInfo from './Addinfo/AddInfo';
import FreeBoard from './Board/FreeBoard';
import FreeWrite from './Board/FreeWrite';
import FreeRead from './Board/FreeRead';
import FreeModify from './Board/FreeModify';
import Footer from './Common/Footer';
import Main from './Main/main';
import UploadImageToS3WithNativeSdk from './Board/UploadImageToS3WithNativeSdk';
import Test from './Board/test1';
import AlcoholInfo from './alcohol/AlcoholInfo';
import AlcoholDetail from './alcohol/AlcoholDetail';
import MyPageModify from './MyPage/MyPageModify';
import LabelBottomNavigation from './Common/LabelBottomNavigation';
import Cover from './Main/cover';
import { CssBaseline } from '@mui/material';
import Register from './register/Register';
import LoginC from './Login/LoginC';
import CocktailList from './Cocktail/CocktailList';
import Recipe from './Cocktail/Recipe/Recipe';

import ScrollToTop from './Common/ScrollToTop';

import AddInfoT from './Addinfo/AddInfoT';
import RecipeOne from './Cocktail/Recipe/RecipeOne';
import RecipeRead from './Cocktail/Recipe/RecipeRead';
import AlchoIndex from './alcohol/AlchoIndex';
import Manager from './manager/Manager';
import NewCocktail from './manager/new/NewCocktail';
import SelfCock from './Cocktail/SelfRecipe/SelfCock';
import SelfCockInsert from './Cocktail/SelfRecipe/SelfCockInsert';
import Recommend from './Recommend/Recommend';
import FillterCocktail from './Recommend/FillterCocktail';
import MyPageInfo from './MyPage/MyPageInfo';
import MyPage from './MyPage/Mypage';
import FaceChatList from './faceChat/FaceChatList';
import AddFaceChatPage from './faceChat/AddFaceChat';
import FaceChat from './faceChat/FactChat';
import SelfCockRecipeRead from './Cocktail/SelfRecipe/SelfCockRecipeRead';


function App() {
  useEffect(()=>{
    window.history.scrollRestoration = 'manual'
  },[])
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="content-all">
          <ScrollToTop />
          <Routes>
          
            <Route path="/" element={<Cover />}></Route>
            <Route path="/login" element={<LoginC />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/AddInfo" element={<AddInfo />}></Route>
            <Route path="/AddInfoT" element={<AddInfoT />}></Route>

            <Route path="/free" element={<FreeBoard />}></Route>
            <Route path="/free/write" element={<FreeWrite />}></Route>
            <Route path="/free/read/:id" element={<FreeRead />}></Route>
            <Route path="/free/modify/:id" element={<FreeModify />}></Route>

            <Route path="/Main" element={<Main />}></Route>

            <Route path='/alcohol' element={<AlchoIndex />} />
            <Route path='/alcohol/info' element={<AlcoholInfo />}></Route>
            <Route path="/alcohol/detail/:id" element={<AlcoholDetail />}></Route>

            <Route path='/cocktail/list/:id' element={<CocktailList />} />
            <Route path='/cocktail/recipe/:id?' element={<Recipe />} ></Route>
            <Route path='/cocktail/recipeRead/:id' element={<RecipeRead />} />
            <Route path='/cocktail/recipe/self' element={<SelfCock/>}/>
            <Route path='/cocktail/recipe/self/insert' element={<SelfCockInsert/>}/>
            <Route path='/cocktail/recipe/self/read/:id' element={<SelfCockRecipeRead/>}/> 

            <Route path='/recommend' element = {<Recommend/>}/>
            <Route path='/recommend/cocktail' element = {<FillterCocktail/>}/>

            <Route path="/test" element={<UploadImageToS3WithNativeSdk />}></Route>
            <Route path="/test1" element={<Test />}></Route>
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPageInfo" element={<MyPageInfo />} />
            <Route path='/myPage/modify' element={<MyPageModify />} />

            <Route path='/manager' element={<Manager />} />
            <Route path='/manager/newCocktail' element={<NewCocktail />} />

            <Route path='/faceChat' element={<FaceChatList/>}/>
            <Route path='/addFaceChat' element={<AddFaceChatPage/>}/>
            <Route path='/faceChat/:id' element={<FaceChat/>}/>
          </Routes>
        </div>
        <LabelBottomNavigation />

      </Router>
    </>


  );
}

export default App;
