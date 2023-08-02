import React from 'react'
import Cookies from 'js-cookie'
import { BsArrowDownCircle,BsArrowUpCircle,BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiError } from 'react-icons/bi';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import UpdateTransaction from '../UpdateTransaction';

const EachTransaction = (props) => {
    const {eachTxn,getAllTransactions} = props
    console.log(eachTxn)
    const isCredit = eachTxn.type==='credit'
    const arrow = isCredit ? <BsArrowUpCircle/> : <BsArrowDownCircle/>
    const symbol = isCredit ? "+" : "-"
    const style = isCredit ? 'credit' : 'debit'
    const categoryy = eachTxn.category ? eachTxn.category : 'none'
    const datee = eachTxn.date.slice(0,10)

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

      const ReactPopUpDelete = () => (
        <div>
          <Popup
            modal
            trigger={
              <button type='button' className='dlt-btn'><RiDeleteBin6Line className='delete-icon-main' /></button>
            }
          >
            {close => (
              <>
                  <div className='delete-container'>
                    <h1 className='delete-head'><BiError className='delete-icon' />Are you sure you want to Delete?</h1>
                    <p className='delete-para'>This transaction will be deleted immediately. You can’t undo this action.</p>
                    <div className='buttons-cont'>
                      <button
                      type="button"
                      className="trigger-delete-button"
                      onClick={deleteTransactions}
                      >Yes, Delete</button>
                      <button
                          type="button"
                          className="trigger-close-button"
                          onClick={() => close()}
                        >
                          No, leave it
                        </button>
                    </div>
                  </div>
              </>
            )}
          </Popup>
        </div>
       )

       const ReactPopUpUpdate = () => (
        <div>
          <Popup
            modal
            trigger={
              <button type='button' className='dlt-btn'><BsPencil className='edit-icon' /></button>
            }
          >
            {close => (
              <>
                <div><UpdateTransaction eachTxn={eachTxn} getAllTransactions={getAllTransactions} /> </div>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Close
                </button> 
              </>
            )}
          </Popup>
        </div>
       )



    return (
      <>
    <li key={eachTxn.id} className='each-txn'>
        <div className='arrow-txn-cont'>
         <span className={style}>{arrow}</span>
         <h1 className='txn-name-head'>{eachTxn.transactionName}</h1>
        </div>
        <p className='txn-para-category'>{categoryy}</p>
        <p className='txn-para'>{datee}</p>
        <p className={style}>{symbol}${eachTxn.amount}</p>
        <div className='icons-cont'>
          <ReactPopUpUpdate />
          <ReactPopUpDelete/>
        </div>
    </li>
    <hr className="horizontal-line" />
    </>
)
}

export default EachTransaction