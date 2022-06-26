import React, { useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'

const URL = 'http://localhost:8000'
const Profile = () => {
  const [ mypics, setPics ] = useState([])
  const { state, dispatch } = useContext(UserContext)

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

  return (
    <div className='profile-page-container'>
      <div className="profile-container">
        <div>
        <img className='profile-img'
          src='https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928'
          alt='User coffee'/>
        </div>
        <div>
          <h4>{state?state.first_name : 'loading'}</h4>
          <div className="profile-stats">
            <h6>{mypics.length} Posts</h6>
            <h6>0 Followers</h6>
            <h6>0 Following</h6>
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