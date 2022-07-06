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


  // LIKE A USERS POST
  const likePost = (_id) => {
    fetch( URL + '/like', {
      method: 'put',
      headers: {
        "Content-Type" : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: _id
      })
    }).then(res=> res.json())
    .then(result => {
      const newData = data.map(item => {
        if(item._id === result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData);
      M.toast({html: 'You liked the post!', classes: '#43a047 green darken-1', displayLength:'1000'})
    }).catch(err=> {
      console.log(err)
    })
  }

  // UNLIKE A POST
  const unlikePost = (_id) => {
    fetch( URL + '/unlike', {
      method: 'put',
      headers: {
        "Content-Type" : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: _id
      })
    }).then(res=> res.json())
    .then(result => {
      const newData = data.map(item => {
        if(item._id === result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData);
      M.toast({html: "You unliked the post!", classes:'#e53935 red darken-1', displayLength:'1000'})
    }).catch(err=> {
      console.log(err)
    })
  }


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
      M.toast({html: 'Deleted post successfully!', classes: '#e53935 red darken-1', displayLength:'1000'})
    })
  }
  // COMMENT ON POST
  const makeComment = (text, postId) => {
    fetch( URL + '/comment', {
      method: 'put',
      headers: {
        "Content-Type" : "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res=> res.json())
    .then(result => {
      console.log(result)
      const newData = data.map(item => {
        if(item._id === result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData);
      M.toast({html: "Comment submitted successfully!", classes:'#43a047 green darken-1', displayLength:'1000'})
    }).catch(err=>{
      console.log(err)
    })
  }

  // DELETE COMMENT
  const deleteComment = (postId, commentId) => {
    fetch( URL + `/delete_comment/${postId}/${commentId}`, {
      method: 'delete',
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      const newData = data.map(item => {
        if(item._id === result._id){
          result.postedBy = item.postedBy;
          return result
        }else{
          return item
        }
      })
      setData(newData)
      M.toast({html: "Comment deleted successfully!", classes:'#e53935 red darken-1', displayLength:'1000'})
    })
  }


  // CLEAR TEXT
  const clearText = () => {
    inputEl.current.remove()
    window.location.reload()
  }


  return (
    <div className="home">
      {
        data.map(item => {
          return(
            <div key={item._id} className='card home-card'>
              {console.log('HERE')}
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
                {item.likes.includes(state._id)?
                <i className='material-icons like_button' onClick={() => {unlikePost(item._id)}}>favorite_border</i>
              :
                <i className='material-icons dislike_button' onClick={() => {likePost(item._id)}}>favorite_border</i>
                }

                <h6>{item.likes.length} likes</h6>
                <h6>Title - {item.title}</h6>
                <p>Brand - {item.brand}</p>
                <p>Blend - {item.blend}</p>
                <p>Review - {item.description}</p>
                <hr />

                {
                  item.comments.map(record => {
                    return(
                      <h6 key={record._id}>
                        <span style={{fontWeight: "500"}}>{record.postedBy.first_name}</span> -  
                        <span className='text-secondary'> {record.text}</span>
                        {record.postedBy._id === state._id && <i className='material-icons comment_delete' onClick={() => deleteComment(item._id, record._id)}>delete_outline</i>}
                      </h6>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id)
                }}>
                  <div className="comment-input-wrapper">
                    <input 
                      type="text" 
                      className="comment-input"
                      placeholder='Add a comment.'
                      ref={inputEl}
                      />
                      <i className='material-icons' style={{ cursor:"pointer"}} onClick={clearText}>clear</i>
                  </div>
                </form>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home