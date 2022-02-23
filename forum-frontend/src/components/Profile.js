import React from 'react'

import GoBack from './GoBack'
import UpdateForm from './UpdateForm'
import UserDetails from './UserDetails'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteUser } from '../reducers/userReducer'
import { deleteThread } from '../reducers/threadReducer'
import { deletePost } from '../reducers/postReducer'
import { useNavigate } from 'react-router-dom'
import Count from './Count'

const Profile = ({ user, users, handleLogout, threads, posts }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const threadsOfUser = threads.filter(thread => thread.user.id === user.id)
  const postsOfUser = posts.filter(post => post.user.id === user.id)
  const id = user.id
  const userMatch = users.find(user => user.id === id)

  const removeUser = (id) => {
    if (window.confirm('Are you sure you want to delete your profile?')){
      try {
        if (userMatch && userMatch.threads.length > 0){
          threadsOfUser.map(thread => dispatch(deleteThread(thread.id)))
        }
        if (userMatch && userMatch.posts.length > 0){
          postsOfUser.map(post => dispatch(deletePost(post.id)))
        }
        handleLogout()
        dispatch(deleteUser(id))
        dispatch(setNotification('User deleted', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  return (
    <>
      <div className='profile'>
        <div>
          {userMatch && <UserDetails user={userMatch}/>}
          {userMatch && <p>Email: {userMatch.email}</p>}
          <Count threadsOfUser={threadsOfUser} postsOfUser={postsOfUser}/>
          {user && <button className='btn btn-danger' onClick={() => removeUser(user.id, user, user)}>Delete profile</button>}
        </div>
        <div>
          <UpdateForm user={user} users={users}/>
        </div>
      </div>
      <GoBack />
    </>
  )
}
export default Profile