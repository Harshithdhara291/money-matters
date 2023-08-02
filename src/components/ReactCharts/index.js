import React from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import {Bar} from 'react-chartjs-2'
import {CategoryScale,Chart,LinearScale,BarElement,Legend,Title,Tooltip} from 'chart.js'; 
import './index.css'

Chart.register(CategoryScale,LinearScale,BarElement,Legend,Title,Tooltip)

const labels = ['sun','mon','tue','wed','thu','fri','sat']

// used dummy data as last 7 days credit and debits values are unstable and most of tham are 0. But fetched APIs and data retrieved  

const data = {
    labels,
    datasets : [
        {
            label:'debit',
            data:[100,200,300,400,500,600,700],
            backgroundColor:'#4D78FF',
            borderRadius: 10,
        },
        {
            label:'credit',
            data:[200,300,400,500,600,700,800],
            backgroundColor:'#FCAA0B',
            borderRadius: 10,
        }
    ]

}

const options ={

    plugins:{
        legend:{
            position:'top'
        },
        title:{
            display:true,
            text:'$7,560 Debited & $5,420 Credited in this Week'
        }
    }
}

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

const ReactChart = () => {
    useEffect(() => {
        getLastWeekCreditDebit()
        getLastWeekCreditDebitAdmin()
      }, []
    )

    const getLastWeekCreditDebit = async () => {
        const userId = Cookies.get('user_id')
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days`
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
       
        if (response.ok) {
            const fetchedData = await response.json()
          console.log(fetchedData,'react chart')
        }
      }

      const getLastWeekCreditDebitAdmin = async () => {
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin`
        const options = {
        headers: {
            'Content-Type' : 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role' : 'admin',
        },
        method: 'GET',
        }
        const response = await fetch(apiUrl, options)
       
        if (response.ok) {
            const fetchedData = await response.json()
            console.log(fetchedData,'react chart admin')
        }
      }

      const renderCharts = () =>{

        return (
            <div className='chart'>
                <Bar data={data} options={options} />
            </div>
        )
      }

    
      // const renderChartsData = () => {
      //   switch (apiStatus) {
      //     case apiStatusConstants.success:
      //       return renderCharts()
      //     case apiStatusConstants.failure:
      //       return FailureView()
      //     case apiStatusConstants.inProgress:
      //       return LoadingView()
      //     default:
      //       return null
      //   }
      // }

  return (
    <div className='main-container-chart'>
        <h1 className='accounts-head-charts'>Debit & Credit Overview</h1>
        {renderCharts()}
    </div>
  )
}

export default ReactChart