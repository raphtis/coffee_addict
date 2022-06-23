import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'

const URL = 'http://localhost:8000'


const Home = () => {
//   const [ data, setData ] = useState([]) 
//   const { state } = useContext(UserContext)
//   const inputEl = useRef(null);



// // GET ALL POSTS FROM ALL USERS
//   useEffect(()=>{
//     fetch( URL + '/get_all',{
//       headers:{
//         'Authorization': "Bearer "+ localStorage.getItem('jwt')
//       }
//     }).then(res=> res.json())
//     .then(result=>{
//       console.log(result)
//       setData(result.posts)
//     })
//   },[])

// // LIKE A USERS POST
//   const likePost = (_id) => {
//     fetch( URL + '/like',{
//       method: 'put',
//       headers: {
//         "Content-Type" : "application/json",
//         'Authorization' : 'Bearer '+ localStorage.getItem('jwt')
//       },
//       body: JSON.stringify({
//         postId: _id
//       })
//     }).then(res=> res.json())
//     .then(result=>{
//       const newData = data.map(item =>{
//         if(item._id === result._id){
//           return result
//         }else{
//           return item
//         }
//       })
//       setData(newData);
//       M.toast({html: "You liked the post!", classes:'#43a047 green darken-1'})
//     }).catch(err=>{
//       console.log(err)
//     })
//   }

// // UNLIKE A USERS POST
//   const unlikePost = (id) => {
//     fetch( URL + '/unlike',{
//       method: 'put',
//       headers: {
//         "Content-Type" : "application/json",
//         'Authorization' : 'Bearer '+ localStorage.getItem('jwt')
//       },
//       body: JSON.stringify({
//         postId: id
//       })
//     }).then(res=> res.json())
//     .then(result=>{
//       const newData = data.map(item =>{
//         if(item._id === result._id){
//           return result
//         }else{
//           return item
//         }
//       })
//       setData(newData);
//       M.toast({html: "You unliked the post!", classes:'#e53935 red darken-1'})
//     }).catch(err=>{
//       console.log(err)
//     })
//   }

// // COMMENT ON A POST
//   const makeComment = (text, postId) => {
//     fetch( URL + '/comment', {
//       method: "put",
//       headers: {
//         "Content-Type" : "application/json",
//         'Authorization' : 'Bearer '+ localStorage.getItem('jwt')
//       },
//       body: JSON.stringify({
//         postId,
//         text
//       })
//     }).then(res => res.json())
//     .then(result => {
//       console.log(result)
//       const newData = data.map(item =>{
//         if(item._id === result._id){
//           return result
//         }else{
//           return item
//         }
//       })
//       setData(newData);
//       M.toast({html: "Comment submitted successfully!", classes:'#43a047 green darken-1'})
//     }).catch(err => {
//       console.log(err)
//     })
//   }

//   // DELETE A POST
//   const deletePost = (postId) => {
//     fetch( URL + `/delete_post/${postId}`, {
//       method: 'delete',
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('jwt')
//       }
//     }).then(res => res.json())
//     .then(result => {
//       console.log(result)
//       const newData = data.filter(item =>{
//         return item._id !== result._id
//       })
//       setData(newData)
//       M.toast({html: "Deleted post successfully!", classes:'#e53935 red darken-1'})
//     })
//   }

//   // DELETE A COMMENT
//   const deleteComment = (postId, commentId) => {
//     fetch( URL + `/delete_comment/${postId}/${commentId}`, {
//       method: 'delete', 
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('jwt')
//       }
//     }).then(res => res.json())
//     .then(result=>{
//       const newData = data.map(item => {
//         if(item._id === result._id){
//           result.postedBy = item.postedBy;
//           return result
//         }else{
//           return item
//         }
//       })
//       setData(newData);
//       M.toast({html: "Comment deleted successfully!", classes:'#e53935 red darken-1'})
//     })
//   }


//   // CLEAR TEXT
//   const clearText = () => {
//     inputEl.current.remove()
//     window.location.reload()
//   }

  return (
    <div className="home">
      <h1>FEED</h1>
    </div>
  )
}

export default Home