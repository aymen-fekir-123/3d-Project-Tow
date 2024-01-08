import React from 'react'
import iphon from '../assets/images/iphone-14.jpg'
import iphone from '../assets/images/iphone-hand.png'
function Jumbotron() {
  const handelllearn = () => {
    const elemnt = document.querySelector(".sound-section");
    window.scrollTo({
      top:elemnt?.getBoundingClientRect().top,
      left:0,
      behavior:'smooth'
    })
  }
  return (
    <div className='jumbotron-section wrapper'>
      <h2 className='title'>New</h2>
      <img className='logo' src={iphon} alt='iphone'/>
      <p className='text'> Big and bigger. </p>
      <span className='description'> From $41.62/mo. for 24 mo. or $999 before trade-in </span>
      <div className='links'>
        <div className='button'> Buy </div>
        <a className='link' onClick={handelllearn}> learn more</a>
      </div>
      
      <img src={iphone} alt='iphone-14' className='iphone-img'/>
     
    </div>
  )
}


export default Jumbotron