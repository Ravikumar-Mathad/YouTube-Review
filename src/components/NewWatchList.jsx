import React from 'react'
import '../styles/newWatchListBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

const NewWatchlistBtn = () => {
  return (
    <button className='watchlistBtn'>
      <FontAwesomeIcon icon={faBookmark} size="sm" style={{color: "#ffffff",}} />
      Watchlist
    </button>
  )
}

export default NewWatchlistBtn
