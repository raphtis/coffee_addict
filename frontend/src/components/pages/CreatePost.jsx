import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const URL = 'http://localhost:8000'


const CreatePost = () => {
  const [ title, setTitle ] = useState('')
  const [ brand, setBrand ] = useState('')
  const [ blend, setBlend ] = useState('')
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
        body: JSON.stringify({
          title,
          brand,
          blend,
          pic:url
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          M.toast({html: data.error, classes: '#e53935 red darken-1'})
        }else{
          M.toast({html: 'Created post successfully!', classes: '#43a047 green darken-1'})
          navigate('/', {replace: true});
        }
      })
      .catch((err) => console.log(err))
    }
  }, [ title, brand, blend, url, navigate])


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
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })
  }




  return (
    <div className="card input-field create-card">
      <h2>Create Post</h2>
      <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type='text' placeholder='Brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
      <input type='text' placeholder='Blend' value={blend} onChange={(e) => setBlend(e.target.value)}/>


      <div className="file-field input-field">
        <div className="btn #4fc3f7 light-blue lighten-2">
          <span>Select Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
        </div>

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2" type="submit" name="action" onClick={() => postDetails()}>
        Submit
        </button>
    </div>
  )
}

export default CreatePost