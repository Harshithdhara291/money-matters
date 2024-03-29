import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome,AiOutlineTransaction } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { FiLogOut,FiMenu } from 'react-icons/fi';
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import { useNavigate,useLocation } from 'react-router-dom' 
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'



const Navbar = () => {
  console.log('navbar mounted')

  const navigate = useNavigate()
  const [isOpen,setIsOpen] = useState(false)
  const location = useLocation();
  

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const onClickLogout = () => {
    Cookies.remove('user_id')
    navigate('/login')
  }

  const ReactPopUp = () => {
    const email = Cookies.get('user_email')
    const name = email.split('@')[0]
    return (
      <>
          <Popup
            modal
            trigger={
              <button type='button' className='logout-button'>
                  <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690992044/Avatar_uasttd.png' alt='logo' className='image-prf' />
                  <div className='name-mail-cont'>
                    <h1 className='logout-name'>{name}</h1>
                    <p className='logout-para'>{email}</p>
                  </div>
                  <FiLogOut className='display-logo' />
              </button>
            }
          >
            {close => (
              <>
                  <div className="logout-popup-container">
                    <h1 className='logout-head'><FiLogOut className='logout-icon' />Are you sure you want to Logout?</h1>
                    <div className='buttons-cont'>
                      <button
                      type="button"
                      className="trigger-logout-button"
                      onClick={onClickLogout}
                      >Yes, Logout</button>
                      <button
                          type="button"
                          className="trigger-close-button"
                          onClick={() => close()}
                        >
                          Close
                        </button>
                    </div>
                  </div>
              </>
            )}
            
          </Popup>
      </>
   )}

  const renderOpenView = () => (
    <div className="open-view-container">
      <ul className="ov-nav-items">
        <Link to="/" className="mobile-nav-link">
          <li className="ov-nav-item"><AiFillHome className='react-icon'/></li>
        </Link>
        <Link to="/transactions" className="mobile-nav-link">
          <li className="ov-nav-item"><AiOutlineTransaction className='react-icon'/></li>
        </Link>
        <Link to="/profile" className="mobile-nav-link">
          <li className="ov-nav-item"><MdAccountBox className='react-icon'/></li>
        </Link>
        <button type='button' className='logout-button-op' onClick={onClickLogout}> <FiLogOut  className='react-icon' /> </button>
      </ul>
      <button type="button" onClick={handleMenu} className="close-button">
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  const renderMobileView = () => {
    return (
      <nav className="mobile-nav-header">
        <div className="mobile-nav-menu">
          <div className="mobile-nav-menu-item">
            <Link to="/">
            <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='mobile-logo' />
            </Link>
          </div>
          <div className="mobile-nav-items">
              <button
                type="button"
                className="mobile-button-nav-link"
                onClick={handleMenu}
              >
                <FiMenu className='menu-icon'/>
              </button>
          </div>
        </div>
        <div className='open-view-main'>{isOpen && renderOpenView()}</div>
      </nav>
    )
  }

  

  const renderDesktopView = () => (
    <div className='navbar-main-container'>
    <nav className='navbar'>
    <Link to="/"><img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='desktop-logo' /></Link>
    <div className='nav-container'>
        <ul className="nav-menu">
                <li className="nav-menu-item">
                <Link to="/" className={location.pathname === '/' ? 'active-link' : 'nav-link'} >
                <AiFillHome className='react-icon'/> Dashboard
                </Link>
                </li>

                <li className="nav-menu-item">
                <Link to="/transactions" className={location.pathname === '/transactions' ? 'active-link' : 'nav-link'} >
                <AiOutlineTransaction className='react-icon'/> Transactions
                </Link>
                </li>
                <li className="nav-menu-item">
                <Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : 'nav-link'} >
                <MdAccountBox className='react-icon'/> Profile
                </Link>
                </li>
        </ul>
        
    </div>
    </nav>
        <div className='logout-button-cont'>
          <ReactPopUp/>
        </div>
    </div>
  )

  return (
    <>
    {renderDesktopView()}
    {renderMobileView()}
    </>
    
  )
}

export default Navbar