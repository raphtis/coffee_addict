import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'

const URL = 'http://localhost:8000'


const Home = () => {
  const [ data, setData ] = useState([])
  const { state } = useContext(UserContext)
  const inputEl = useRef(null);

  // SHOW ALL POSTS IN FEED
  useEffect(() => {
    fetch( URL + '/all_posts', {
      headers: {
        'Authorization': "Bearer "+ localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setData(result.posts)
    })
  }, [])

  // DELETE POST
  const deletePost = (postId) => {
    fetch( URL + `/delete_post/${postId}`, {
      method: 'delete',
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      const newData = data.filter(item => {
        return item._id !== result._id
      })
      setData(newData)
      M.toast({html: 'Deleted post successfully!', classes: '#e53935 red darken-1'})
    })
  }
  // COMMENT ON POST

  // DELETE COMMENT

  // CLEAR TEXT

  return (
    <div className="home">
      {
        data.map(item => {
          return(
            <div key={item._id} className='card home-card'>
              <h5 className='post-username'>
                {/* IF USER CLICKS OWN POST IN FEED LINKS TO USERS PROFILE */}
                <NavLink to={item.postedBy._id !== state._id? '/profile/'+ item.postedBy._id: '/profile'}>{item.postedBy.first_name}</NavLink>
                {item.postedBy._id === state._id && <i className='material-icons delete_button' 
                onClick={() => deletePost(item._id)}>clear</i> }
              </h5>

              <div className="card-image">
                <img src={item.photo} alt='User profile' />
              </div>

              <div className="card-content">
                <i className='material-icons like_button'>favorite_border</i>

                <h6>{item.likes.length}</h6>
                <h6>{item.title}</h6>
                <p>{item.brand}</p>
                <p>{item.blend}</p>
                <p>{item.description}</p>
                <hr />

              <h6>COMMENTS HERE</h6>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home