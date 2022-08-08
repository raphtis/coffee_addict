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
      M.toast({html: 'Invalid Email Address', classes:'#F2C500 yellow darken-2', displayLength:'1000'})
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
        M.toast({html: data.error, classes:'#F2C500 yellow darken-2', displayLength:'1000'})
      }else{
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch({type: 'USER', payload:data.user})
        M.toast({html: "Logged in successfully!", classes: '#a5d6a7 green lighten-3', displayLength:'1000'})
        navigate('/', {replace: true});
      }
    })
    .catch((err) => console.log(err))
  }
  return (
    <div className='login_container'>
      <h2 className='signup_heading'>Login</h2>
      <div className='row'>

        <form className="col s12">
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

        <div className="button_container">
          <button className="btn signup_button" type="submit" name="action" onClick={PostData}>Login
          </button>
        </div>

        <div className='row'>
          <h6 className='signup_heading'>
            <Link to='/signup'>New User?</Link>
          </h6>
        </div>

      </div>
    </div>
  )
}

export default Login