import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const URL = 'http://localhost:8000'
const UserProfile = () => {
  const [ userProfile, setProfile ] = useState(null)
  const {userId} = useParams()


  useEffect(() => {
    fetch( URL + `/user/${userId}`, {
      headers:{
        "Authorization" : "Bearer " + localStorage.getItem('jwt')
      }
    }).then(res=> res.json())
    .then(result=>{
      console.log(result)
      setProfile(result)
    })
  }, [userId])

  return (
    <>
    {userProfile ? 
    
    <div className='profile-page-container'>
      <div className='profile-container'>
        <div>
          <img className='profile-img'
          src='https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928'
          alt='User coffee'/>
        </div>
        <div>
          <h4>{userProfile.user.first_name}</h4>
          <h5>{userProfile.user.email}</h5>
          <div className='profile-stats'>
            <h6>{userProfile.posts.length} Posts</h6>
            <h6>20 Followers</h6>
            <h6>20 Following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {
          userProfile.posts.map(item =>{
            return(
              <img key={item._id}className='gallery-item' src={item.photo} alt='User coffee'/>
            )
          })
        }
      </div>
    </div>
    : <h2 style={{textAlign: 'Center'}}>Loading ...!</h2>}
    
    </>
  )
}

export default UserProfile