/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const URL = 'http://localhost:8000'

const Signup = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const navigate = useNavigate();

  const PostData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email Address', classes:'#e53935 red darken-1'})
      return
    }
    fetch( URL + '/signup', {
      method: 'post',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        firstName,
        lastName,
        password,
        email
      })
    })
    .then(res => res.json())
    // ERROR/SUCCESS POP UP
    .then(data => {
      console.log('HERE')
      if(data.error){
        M.toast({html: data.error, classes:'#e53935 red darken-1'})
      }else{
        M.toast({html: data.message, classes:'#43a047 green darken-1'})
        navigate('/login', {replace: true});
      }
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Coffee Addict</h2>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />  
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
" type="submit" name="action" onClick={() => PostData()}>Sign Up</button>
        <h6>
          <Link to='/login'>Already have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Signup