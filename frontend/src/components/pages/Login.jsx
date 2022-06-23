import React, { useState, useContext,  } from 'react'
import { UserContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const URL = 'http://localhost:8000'

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const navigate = useNavigate();

  const PostData = () => {
    // eslint-disable-next-line no-useless-escape
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email Address', classes:'#e53935 red darken-1'})
      return
    }
    fetch( URL + '/login', {
      method: 'post',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    })
    .then(res => res.json())
    // ERROR/SUCCESS POP UP
    .then(data => {
      if(data.error){
        M.toast({html: data.error, classes:'#e53935 red darken-1'})
      }else{
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch({type: 'USER', payload:data.user})
        M.toast({html: "Logged in successfully!", classes:'#43a047 green darken-1'})
        navigate('/', {replace: true});
      }
    })
    .catch((err) => console.log(err))
  }
  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Coffeegram</h2>
        <input 
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
        <input 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> 
        <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2
        " type="submit" name="action" onClick={PostData}>Login</button>
        <h6>
          <Link to='/signup'>New user?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Login