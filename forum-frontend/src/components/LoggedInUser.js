import React from 'react'
import { Link } from 'react-router-dom'

const LoggedInUser = ({ users, user, handleLogout }) => {
  if (!user){
    return null
  }
  const userMatch = users.find(u => u.id === user.id)
  return (
    <div className='logged-in'><Link to={`/user/${user.username}`}><div className='logged-in'>{userMatch && userMatch.avatar ? <img src={userMatch.avatar} alt='profile' className='avatar avatar-small'/> : <img src='http://localhost:3003/public/uploads/default-avatar.png' alt='profile' className='avatar avatar-small'/>}<span className='page-link'>{user.username}</span></div></Link> is logged in <Link to='/profile'><span className='settings'><i className="fa-solid fa-gear"></i></span></Link> <button className='btn btn-primary' onClick={handleLogout}>Log Out</button></div>
  )
}
export default LoggedInUser