import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const URL = 'http://localhost:8000'


const CreatePost = () => {
  const [ title, setTitle ] = useState('')
  const [ brand, setBrand ] = useState('')
  const [ blend, setBlend ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ image, setImage ] = useState('')
  const [ url, setUrl ] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if(url){
    fetch( URL + '/createpost', {
      method: 'post',
      headers:{
        'Content-Type': "application/json",
        'Authorization': "Bearer "+ localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        title,
        brand,
        blend,
        description,
        pic:url
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({html: data.error, classes:'#e53935 red darken-1'})
      }else{
        M.toast({html: 'Created post successfully!', classes: '#43a047 green darken-1'})
        navigate('/', {replace: true});
      }
    })
    .catch((err) => console.log(err))
  }
  }, [ title, brand, blend, description, url, navigate])


  const postDetails = () => {
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
        M.toast({html: 'Please add all fields!', classes:'#e53935 red darken-1'})
      }else{
      setUrl(data.url)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <div className='createpost_container'>
      <h3 className='signup_heading'>Create a Review</h3>
      <div className="row">
        <div className="col s12">

          <div className="row">
            <div className="input-field col s12">
              <input id='title' className='validate' type='text'  value={title} onChange={(e) => setTitle(e.target.value)}/>
              <label htmlFor='title'>Title</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id='brand' type='text' value={brand} onChange={(e) => setBrand(e.target.value)}/>
              <label htmlFor='brand'>Brand</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id='blend' className='validate' type='text' value={blend} onChange={(e) => setBlend(e.target.value)}/>
              <label htmlFor='blend'>Blend</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id='description' className='validate' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
              <label htmlFor='description'>Description</label>
            </div>
          </div>

          <div className="row">
            <div className="file-field input-field s6">
              <div className="btn select_img_button">
                <span>Select Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="button_container">
          <button className="btn waves-effect waves-light signup_button" type="submit" name="action" onClick={() => postDetails()}>
          Submit
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreatePost