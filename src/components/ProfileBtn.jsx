import React from 'react'
import '../styles/profileBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfileBtn = () => {
  return (
    <button className='profileBtn'>
      <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#ffffff",}} />
    </button>
  )
}

export default ProfileBtn
