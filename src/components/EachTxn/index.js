import React from 'react'
import Cookies from 'js-cookie'
import { BsArrowDownCircle,BsArrowUpCircle } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './index.css'

const EachTransaction = (props) => {
    const {eachTxn,getAllTransactions} = props
    const isCredit = eachTxn.type==='credit'
    const arrow = isCredit ? <BsArrowUpCircle/> : <BsArrowDownCircle/>
    const symbol = isCredit ? "+" : "-"
    const style = isCredit ? 'credit' : 'debit'
    const category = eachTxn.category ? eachTxn.category : 'none'
    const date = eachTxn.date.slice(0,10)

    const deleteTransactions = async () => {
        const userId = Cookies.get('user_id')
        const id = {id:eachTxn.id}
        console.log(id)
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction`
        const options = {
        headers: {
            'Content-Type' : 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role' : 'user',
            'x-hasura-user-id' : userId,
        },
        method: 'DELETE',
        body: JSON.stringify(id)
        }
        const response = await fetch(apiUrl, options)
        if(response.ok){
            const fetchedData = await response.json()
            console.log(fetchedData)
            getAllTransactions()
        }
        
      }


    return (
    <li key={eachTxn.id} className='each-txn'>
        <div className='arrow-txn-cont'>
         <span className={style}>{arrow}</span>
         <h1 className='txn-name-head'>{eachTxn.transactionName}</h1>
        </div>
        <p className='txn-para-category'>{category}</p>
        <p className='txn-para'>{date}</p>
        <p className={style}>{symbol}${eachTxn.amount}</p>
        <div className='icons-cont'>
        <button type='button' onClick={deleteTransactions} className='delete-btn'><RiDeleteBin6Line className='delete-icon'/></button>
        </div>
    </li>
    
)
}

export default EachTransaction