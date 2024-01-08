import React from 'react'

function SoundSection() {
    const handelllmore = () => {
        const elemnt = document.querySelector(".display-section");
        window.scrollTo({
          top: elemnt?.getBoundingClientRect().bottom,
          left:0,
          behavior:'smooth'
        })
    }
  return (
    <div className='sound-section wrapper'>
        
      
        <div className='body'>
            <div className='sound-section-content content'>
                <h2 className='title'>New Sound System</h2>
        
                <p className='text'> Feel the base.</p>

                <span className='description'> From $41.62/mo. for 24 mo. or $999 before trade-in </span>

                <div className='links'>
                    <div className='button'> Buy </div>
                    <a className='link'  onClick={handelllmore}> learn more</a>
                </div>

            </div>
        </div>
      
     
    </div>
  )
}


export default SoundSection;