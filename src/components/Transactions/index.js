import React from 'react'
import Navbar from '../Navbar'
import NonAdminAllTxns from '../NonAdminAllTxns'
import './index.css'

const Transactions = () => {
  return (
    <div className='main-container'>
      <div className='header-container'><Navbar/></div>
      <div className='all-txns-container'><NonAdminAllTxns/></div>
    </div>
  )
}

export default Transactions