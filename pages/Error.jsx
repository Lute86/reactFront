import React, { useEffect } from 'react'
import './Error.css'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)

    // Cleanup function, cancels timeout if exiting
    return () => clearTimeout(timer)
  }, [navigate]) 

  return (
    <div className='error-page-container'>
      <div className='error-page-message'>Oops.....This page doesn't exist</div>
      <p>You'll be redirected to the homepage...</p>
    </div>
  )
}

export default Error
