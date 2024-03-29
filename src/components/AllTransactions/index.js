import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css'
import LoadingView from '../Loading'
import FailureView from '../FailureView'
import AddTransaction from '../AddTransaction';
import TabItem from '../TabItem';
import EachTransaction from '../EachTxn';
import { AiOutlineClose } from "react-icons/ai";
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

  const tabsList = [
    {tabId: 'ALLTXNS', displayText: 'All transactions'},
    {tabId: 'CREDIT', displayText: 'Credit'},
    {tabId: 'DEBIT', displayText: 'Debit'},
  ]

 

const AllTransactions = () => {

    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [transactionData, setTransactionData] = useState([])
    const [activeTab, setActiveTab] = useState(tabsList[0].tabId)
    

    useEffect(() => {
        getAllTransactions()
      }, [])

    const getAllTransactions = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const userId = Cookies.get('user_id')
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0`
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
        console.log(response)
        if (response.ok) {
            const fetchedData = await response.json()
          const updatedData = fetchedData.transactions.map(txn => ({
            id: txn.id,
            amount: txn.amount,
            category: txn.category,
            date: txn.date,
            type: txn.type,
            transactionName: txn.transaction_name,
          }))
          setTransactionData(updatedData)
          setApiStatus(apiStatusConstants.success)
        } else {
          console.log('eroor')
          setApiStatus(apiStatusConstants.failure)
        }
      }

      const renderAllTransactions = () =>{
        
        
        const creditList = transactionData.filter(each =>(
          each.type==='credit'
        ))
        const debitList = transactionData.filter(each =>(
          each.type==='debit'
        ))

        let filteredTxns = transactionData
        console.log(activeTab)
        switch(activeTab){
          case 'ALLTXNS':
            filteredTxns=transactionData
            break;
          case 'CREDIT':
            filteredTxns=creditList
            break;
          case 'DEBIT':
            filteredTxns=debitList
            break;
          default:
            return null
        }
        

        console.log(filteredTxns)

        return (
            <ul className='all-txns-un-list'>
                {filteredTxns.map(eachTxn =>(
                  <EachTransaction key={eachTxn.id} eachTxn={eachTxn} getAllTransactions={getAllTransactions} />
                ))}
            </ul>
        )

      }

    
      const renderTransactions = () => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderAllTransactions()
          case apiStatusConstants.failure:
            return <FailureView  retry={getAllTransactions} />
          case apiStatusConstants.inProgress:
            return LoadingView()
          default:
            return null
        }
      }

      const clickTabItem = tabValue => {
        setActiveTab(tabValue)
      }

      const ReactPopUp = () => (
        <div>
          <Popup
            modal
            className='popup-modal'
            trigger={
              <button type="button" className="add-txn-button">
                + Add Transaction
              </button>
              
            }
          >
            {close => (
              <>
                  <div className="popup-container">
                < AddTransaction getAllTransactions={getAllTransactions}/>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <AiOutlineClose/>
                </button>
                </div>
              </>
            )}
          </Popup>
        </div>
       )

  return (
    <>
        <div className='all-txns-head-container'>
          <h1 className='accounts-head'>Transactions</h1>
        <ReactPopUp/>
        </div>        
        <div>
          <ul className='tabs-list'>
            {tabsList.map(tabDetails=>(
                <TabItem key={tabDetails.tabId}
                tabDetails={tabDetails}
                clickTabItem={clickTabItem}
                isActive={activeTab === tabDetails.tabId}/>
            ))}
          </ul>
        </div>
        <div className='all-transactions'>{renderTransactions()}</div>
    </>
  )
}

export default AllTransactions