import React from 'react'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import NonAdminLastTxns from '../NonAdminLastTxns'
import './index.css'

const Dashboard = () => {

  const [credit, setCredit] = useState(0)
  const [debit, setDebit] = useState(0)

  useEffect(() => {
    getCreditDebitTotal()
  }, []
  )

  const getCreditDebitTotal = async() =>{
    const userId = Cookies.get('user_id')
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals`
    const options = {
      headers: {
        'Content-Type' : 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role' : 'user',
        'x-hasura-user-id' : userId,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const array = fetchedData.totals_credit_debit_transactions
    // console.log(array)
    let credited=0,debited=0;
    for (let i = 0 ; i<array.length; i++){
      console.log(array[i])
        if(array[i].type==='credit'){
          credited+=array[i].sum
        } else{
          debited+=array[i].sum
        }
    }
    // console.log(credited,debited)
    
    if (response.ok) {
      setCredit(credited)
      setDebit(debited)
    } 
  }



  return (
    <div className='main-container'>
      <Navbar/>
      <div className='dashboard-container'>
        <div className='head-container'>
          <h1 className='accounts-head'>Accounts</h1>
          <button type='button' className='add-txn-button'>+ Add Transaction</button>
        </div>
        <div className='second-container'>
            <div className='credit-debit-container'>
              <div className='credit-container'>
                <div>
                  <h1 className='credit-amount-head'>${credit}</h1>
                  <p className='credit-debit-para'>Credit</p>
                </div>
                  <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692027/credit_b8jngd.png' alt='credit' className='credit-debit-image'/>
              </div>
              <div className='debit-container'>
                <div>
                  <h1 className='debit-amount-head'>${debit}</h1>
                  <p className='credit-debit-para'>Debit</p>
                </div>
                  <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692017/debit_db9dra.png' alt='credit' className='credit-debit-image'/>
              </div>
            </div>
            <div className='last-txn-container'>
              <NonAdminLastTxns/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard