/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const URL = 'http://localhost:8000'

const Signup = () => {
  const [ first_name, setFirst_name ] = useState('')
  const [ last_name, setLast_name ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ image, setImage ] = useState('')
  const [ url, setUrl ] = useState(undefined)
  const navigate = useNavigate();


  useEffect(() =>{
    if(url){
      uploadFields()
    }
  }, [url])

  const uploadPic = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'coffeeaddict')
    data.append('cloud_name', 'raphtis3122')
    fetch('https://api.cloudinary.com/v1_1/raphtis3122/image/upload', {
      method: 'post',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({html: 'Please add all fields!', classes:'#F2C500 yellow darken-2', displayLength:'1000'})
      }else{
      setUrl(data.url)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const uploadFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email Address', classes:'#F2C500 yellow darken-2', displayLength:'1000'})
      return
    }
    fetch( URL + '/signup', {
      method: 'post',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        first_name,
        last_name,
        password,
        email,
        pic:url
      })
    })
    .then(res => res.json())
    // ERROR/SUCCESS POP UP
    .then(data => {
      if(data.error){
        M.toast({html: data.error, classes:'#F2C500 yellow darken-2', displayLength:'1000'})
      }else{
        M.toast({html: data.message, classes:'#43a047 green darken-1', displayLength:'1000'})
        navigate('/login', {replace: true});
      }
    })
    .catch((err) => console.log(err))
  }

  const PostData = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
  }

  return (
    <div className='signup_container'>
      <h3 className='signup_heading'>Sign Up</h3>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="first_name" type="text" className="validate" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
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

          <div className="row">
            <div className="file-field input-field s6">
              <div className="btn select_img_button">
                <span>Select Profile Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
        </form>

        <div className='button_container'>
          <button className="btn waves-effect waves-light signup_button" type="submit" name="action" onClick={(e) => PostData(e.target.value)}>Sign Up
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