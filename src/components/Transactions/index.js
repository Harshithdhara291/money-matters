import React from 'react'
import Navbar from '../Navbar'
import AllTransactions from '../AllTransactions'
import './index.css'

const Transactions = () => {
  return (
    <div className='main-container-txns'>
      <div className='header-container'><Navbar/></div>
      <div className='all-txns-container'><AllTransactions/></div>
    </div>
  )
}

export default Transactions