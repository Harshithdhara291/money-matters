import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import './index.css'

const AddTransaction = (props) => {
  const [name, setTxnName] = useState('')
  const [type, setTxnType] = useState()
  const [category, setCategory] = useState()
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

    const submitForm = async event => {
        event.preventDefault()
        const userId = Cookies.get('user_id')
        console.log(userId)
        const user_id = userId
        const userDetails = {name,type,category,amount,date,user_id}
        const url = `https://bursting-gelding-24.hasura.app/api/rest/add-transaction`
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
        setTxnName('')
        setTxnType()
        setCategory()
        setAmount('')
        setDate('')
        console.log(props,'props')
        if (Object.getOwnPropertyNames(props).length !== 0){
          console.log('if true')
          const {getAllTransactions} = props
          getAllTransactions()
        } else{
          alert('Transaction Added!!')
        }
        
      }


  return (
    <div className='add-transaction'>
    <form className="form-ad" onSubmit={submitForm} >
       <p className="form-title-ad">Add Transaction</p>
       
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
                <option value="Select Transaction Type" hidden>Select Transaction Type</option>
                <option value='credit'>credit</option>
                <option value='debit'>debit</option>
            </select>
            <label  htmlFor="category">Category</label>
            <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Select" hidden>Select</option>
                <option value='transfer'>Transfer</option>
                <option value='shopping'>Shopping</option>
                <option value='salary'>Salary</option>
                <option value='service'>Service</option>
                <option value='subscriptions'>Subscriptions</option>
                <option value='others'>Others</option>
            </select>
        <label  htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter Your Amount"
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
        Add Transaction
      </button>
   </form>
    </div>
  )
}

export default AddTransaction