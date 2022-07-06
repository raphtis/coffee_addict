import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../App'
import { useParams } from 'react-router-dom'

const URL = 'http://localhost:8000'
const UserProfile = () => {
  const [ userProfile, setProfile ] = useState(null)
  const { state, dispatch } = useContext(UserContext)
  const {userId} = useParams()


  const [ showFollow, setShowFollow ] = useState(state?!state.followers.includes(userId):true)
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

  const followUser = () => {
    fetch( URL + '/follow',{
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userId
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch({ type: "UPDATE", payload:{following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setProfile((prevState) =>{
        return{
          ...prevState,
          user:{...prevState.user,followers:[...prevState.user.followers,data._id]}
        }
      })
      setShowFollow(false)
    })
  }

  const unfollowUser = () => {
    fetch ( URL + '/unfollow', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId:userId
      })
    }).then(res => res.json())
    .then(data => {
      dispatch({ type: "UPDATE", payload:{following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setProfile((prevState) => {
        const newFollower = prevState.user.followers.filter(item=>item !== data._id)
        return{
          ...prevState,
          user:{...prevState.user,followers:newFollower}
        }
      })
      setShowFollow(true)
    })
  }

  return (
    <>
    {userProfile ? 
    
    <div className='profile-page-container'>
      <div className='profile-container'>
        <div>
          <img className='profile-img'
          src={userProfile.user.photo}
          alt='User coffee'/>
        </div>
        <div>
          <h4>{userProfile.user.first_name}</h4>
          <h5>{userProfile.user.email}</h5>
          <div className='profile-stats'>
            <h6>{userProfile.posts.length} Posts|</h6>
            <h6>{userProfile.user.followers.length}  Followers|</h6>
            <h6>{userProfile.user.following.length} Following</h6>
          </div>

          <div className="button_container">
            {showFollow?
          
            <button className="btn waves-effect waves-light signup_button" type="submit" name="action" onClick={followUser}>Follow
            <i className="material-icons right">send</i>
            </button>
            :  
            <button className="btn waves-effect waves-light signup_button" type="submit" name="action" onClick={unfollowUser}>Unfollow
            <i className="material-icons right">send</i>
            </button>
            }

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