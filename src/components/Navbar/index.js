import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome,AiOutlineTransaction } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom' 
import './index.css'

const Navbar = () => {

  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('user_id')
    navigate('/login')
  }

  return (
    <div className='navbar-main-container'>
    <nav className='navbar'>
    <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='logo' />
    <div className='nav-container'>
        <ul className="nav-menu">
                <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                <AiFillHome className='react-icon'/> Dashboard
                </Link>
                </li>

                <li className="nav-menu-item">
                <Link to="/transactions" className="nav-link">
                <AiOutlineTransaction className='react-icon'/> Transactions
                </Link>
                </li>
                <li className="nav-menu-item">
                <Link to="/profile" className="nav-link">
                <MdAccountBox className='react-icon'/> Profile
                </Link>
                </li>

        </ul>
        
    </div>
    </nav>
        <div className='logout-button-cont'>
            <button type='button' className='logout-button' onClick={onClickLogout}>Logout <FiLogOut/> </button>
        </div>
    </div>
  )
}

export default Navbar