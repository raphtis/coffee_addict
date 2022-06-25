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

  // COMMENT ON POST

  // DELETE COMMENT

  // CLEAR TEXT

  return (
    <div className="home">
      {
        data.map(item => {
          return(
            <div key={item._id} className='card home-card'>
              <h5 className='post-username'>{item.postedBy.first_name} {item.postedBy.last_name}</h5>

              <div className="card-image">
                <img src={item.photo} alt='User profile' />
              </div>

              <div className="card-content">
                <i className='material-icons like_button'>favorite_border</i>
              </div>

              <h6>{item.likes.length}</h6>
              <h6>{item.title}</h6>
              <p>{item.brand}</p>
              <p>{item.blend}</p>
              <p>{item.description}</p>
              <hr />

              <h6>COMMENTS HERE</h6>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home