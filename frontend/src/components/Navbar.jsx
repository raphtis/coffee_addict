import React, { useContext } from 'react'
import { UserContext } from '../App'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const { dispatch, state } = useContext(UserContext)
  const navigate = useNavigate();

  // RENDERS LINKS FOR LOGGED IN USERS 
  const renderList = () => {
    if(state){
      return[
        <li><NavLink to="/profile"><i className='material-icons'>person_outline
        </i></NavLink></li>,
        <li><NavLink to="/create-post"><i className='material-icons'>add_circle_outline
        </i></NavLink></li>,
        <li>
          <button className='material-icons logout-button'
        type="submit" onClick={()=>{
          localStorage.clear()
          dispatch({ type: "CLEAR"})
          navigate('/login', {replace: true})
        }}
        >exit_to_app</button>
        </li>
      ]
    }else{
      return[
        <li><NavLink to="/login">Login</NavLink></li>,
        <li><NavLink to="/signup">Sign Up</NavLink></li>
      ]
    }
  }

  return (
    <nav>
    <div className="nav-wrapper white">
      <NavLink to='/' alt="Name of site" className='brand-logo left'>Coffeegram</NavLink>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar