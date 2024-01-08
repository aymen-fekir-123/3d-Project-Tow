import React from 'react'
import AnimatedLogo from '../assets/images/logo-animated.gif'


function Loader() {
  return (
    <div className='loader'>
    <img className='logo' src={AnimatedLogo} alt='logo animated'/>
    </div>
  )
}

export default Loader