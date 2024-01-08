import React from 'react'
import Logo from '../assets/images/logo.svg'
import Store from '../assets/images/store.svg'
import Search from '../assets/images/search.svg'

function Nav() {
  return (
    <nav className='nav-wrapper'>
        <div className='nav-content'>
            <ul className='list-styled'>
                <li>
                    <img src={Logo} alt='Apple'/>
                </li>
                <li>
                    <a className='link-styled'>
                        store
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Mac
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        iPhone
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        iPad
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        AirPod
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Acsesoires
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Tv & Show
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Enternthment
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Watch
                    </a>
                </li>
                <li>
                    <a className='link-styled'>
                        Support
                    </a>
                </li>
                <li>
                    <img src={Store} alt='store'/>
                </li>
                <li>
                    <img src={Search} alt='store'/>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav ;