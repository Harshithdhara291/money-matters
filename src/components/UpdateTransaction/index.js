import React from 'react'
import { useState } from 'react'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import './index.css'

const UpdateTransaction = (props) => {
    const {eachTxn,getAllTransactions} = props
    const [name, setTxnName] = useState(eachTxn.transactionName)
    const [type, setTxnType] = useState(eachTxn.type)
    const [category, setCategory] = useState(eachTxn.category)
    const [amount, setAmount] = useState(eachTxn.amount)
    const [date, setDate] = useState(eachTxn.date)

  const submitForm = async event => {
    event.preventDefault()
    const userId = Cookies.get('user_id')
    const id = eachTxn.id
    const userDetails = {id,name,type,category,amount,date}
    const url = `https://bursting-gelding-24.hasura.app/api/rest/update-transaction`
    const options = {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role' : 'user',
        'x-hasura-user-id' : userId,
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (Object.getOwnPropertyNames(props).length !== 0){
      getAllTransactions()
    } else{
      alert('Transaction Added!!')
    }
    
  }


  return (
    <div className='add-transaction'>
    <form className="form-ad" onSubmit={submitForm} >
       <p className="form-title-ad">Update Transaction</p>
        <div className="input-container-ad">
        <label  htmlFor="txnName">Transaction Name</label>
        <input
              type="text"
              id="txnName"
              value={name}
              onChange={e => setTxnName(e.target.value)}
              placeholder="Enter Name"
              required
            />
            <label  htmlFor="type">Transaction Type</label>
            <select id='type' value={type} onChange={(e) => setTxnType(e.target.value)}>
                <option value='credit'>credit</option>
                <option value='debit'>debit</option>
            </select>
            <label  htmlFor="category">Category</label>
            <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value='transfer'>Transfer</option>
                <option value='food'>Food</option>
                <option value='shopping'>Shopping</option>
                <option value='salary'>Salary</option>
            </select>
        <label  htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter Amount"
              required
            />
        <label  htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
        </div>
         <button type="submit" className="submit">
        Update Transaction
      </button>
   </form>
    </div>
  )
}

export default UpdateTransaction