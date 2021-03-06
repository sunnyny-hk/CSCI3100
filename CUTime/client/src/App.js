/*
    Description : frontend app page that mainly for using redux to dispatch (sending action) -> store state
                    ie current user info, token, login status
    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/2/27
    Last modified : 2022/4/10
*/

import React, { useEffect } from 'react'
import {BrowserRouter as Router} from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin,fetchUser,dispatchGetUser} from './redux/actions/authAction'


import Header from './loginComponents/header/header'
import Body from './loginComponents/body/body'
import axios from 'axios'



function App() {
  const dispatch = useDispatch() 
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() =>{
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin){
      try {
        const getToken = async() =>{
        const res = await axios.post('/user/refresh_token', null)
        console.log(res)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token}) // assign token 
        
        } 
      getToken()
        
      }catch (err){
        console.log(err)
      }

     
    }
  },[auth.isLogged, dispatch])

  useEffect (() => {
    if(token){
      const getUser = () =>{
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res)) 
        })
      }
      getUser()
    }
  }, [token, dispatch])

  return (
    <Router>
    <div className="App">
      <Header />
      <Body />
    </div>
    </Router>
  );
}

export default App;
