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
    <div>
      <div className='card input-field'>
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
    

    {/* UPDATED FORM STARTS HERE */}
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="first_name" type="text" className="validate" />
            <label for="first_name">First Name</label>
          </div>

          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" />
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
          <i className="material-icons prefix">password</i>
            <input id="password" type="password" className="validate" />
            <label for="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className="validate" />
            <label for="email">Email</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    </div>
  )
}

export default Signup