import React, { useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'

const URL = 'http://localhost:8000'

const Profile = () => {
  const [ mypics, setPics ] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [ image, setImage ] = useState('')

  useEffect(() => {
    fetch( URL + '/my_posts', {
      headers:{
        "Authorization" : "Bearer " + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setPics(result.myPosts)
    })
  }, [])

  useEffect(() => {
    if(image){
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
        fetch( URL + '/update_picture', {
          method: 'put',
          headers:{
            'Content-Type':"application/json",
            'Authorization': "Bearer "+ localStorage.getItem('jwt')
          },
          body:JSON.stringify({
            pic:data.url
          })
        }).then(res => res.json())
        .then(result => {
          console.log(result)
          localStorage.setItem("user", JSON.stringify({...state, photo:result.photo}))
          dispatch({ type: 'UPDATEPIC', payload:result.photo})
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [image])

  const updatePic = (file) => {
    setImage(file)
  }

  return (
    <div className='profile-page-container'>
      <div className="profile-container">
        <div>
          <img className='profile-img'
            src={state?state.photo:'loading'}
            alt='User coffee'/>
        </div>
        
        <div>
          <h4>{state?state.first_name : 'loading'}</h4>
          <h5>{state?state.email : 'loading'}</h5>
          <div className="profile-stats">
            <h6>{mypics.length} Posts|</h6>
            <h6>{state?state.followers.length: '0'} Followers|</h6>
            <h6>{state?state.following.length: '0'} Following</h6>
            
          </div>
          <div className="row">
            <div className="file-field input-field s6">
              <div className="btn select_img_button">
                <span>Update Image</span>
                <input type="file" onChange={(e) => updatePic(e.target.files[0])}/>
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      <div className="gallery">
        {
          mypics.map(item => {
            return(
              <img key={item._id} className='gallery-item' src={item.photo} alt='User coffees' />
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile