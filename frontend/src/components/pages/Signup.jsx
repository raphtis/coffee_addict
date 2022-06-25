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
    <div className='signup_container'>
      <h3 className='signup_heading'>Sign Up</h3>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="first_name" type="text" className="validate" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
            <i className="material-icons prefix">password</i>
              <input id="password" type="password" className="validate" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </form>

        <div className='button_container'>
          <button className="btn waves-effect waves-light signup_button" type="submit" name="action" onClick={(e) => PostData(e.target.value)}>Sign Up
            <i className="material-icons right">send</i>
          </button>
        </div>

        <div className='row'>
          <h6 className='signup_heading'>
            <Link to='/login'>Already have an account?</Link>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Signup