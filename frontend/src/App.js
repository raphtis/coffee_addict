import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import CreatePost from "./components/pages/CreatePost";
import UserProfile from './components/pages/UserProfile';
import { Route, Routes, useNavigate } from "react-router-dom";
import { initialState, reducer } from './reducers/userReducer'
import './App.css'
import SubUserPosts from './components/pages/SubUserPosts';

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext)

  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
      dispatch({type: 'USER', payload:user})
      // VIEW USER LOGGED IN CONSOLE
      console.log(user)
    }else{
      navigate('/signup', {replace: true})
    }
  }, [dispatch])
  return(
    <Routes>
      <Route path='/explore' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/profile/:userId' element={<UserProfile />} />
      <Route path='/' element={<SubUserPosts />}/>
    </Routes>
  )
}

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Navbar />
        <Routing />
      </div>
    </UserContext.Provider>
  );
}

export default App;
