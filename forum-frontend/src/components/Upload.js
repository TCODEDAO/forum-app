import React, { useState } from 'react'
import axios from 'axios'

const Upload = ({ user }) => {
  const [avatar, setAvatar] = useState([])
  const [name, setName] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
    console.log(file)
    console.log(user)
  }

  const submitAvatar = (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    formData.append('name', name)
    formData.append('avatar', avatar)
    axios
      .post('http://localhost:3003/api/image', formData)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }
  return (
    <div>
      <form onSubmit={submitAvatar}>
        <input type='text' id='name' onChange={handleNameChange}></input>
        <input type='file' multiple accept='image/*' onChange={onImageChange}></input>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default Upload