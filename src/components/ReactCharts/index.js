/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import LoadingView from '../Loading'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ReactChart = () => {

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [profileData, setProfileData] = useState({})
    
    const getFormattedData = data => ({
      name: data.name,
      email: data.email,
      country: data.country,
      id: data.id,
      dateOfBirth: data.date_of_birth,
      city: data.city,
      permanentAddress: data.permanent_address,
      postalCode: data.postal_code,
      presentAddress: data.present_address,
    })

    useEffect(() => {
        getLastWeekCreditDebit()
      }, []
    )

    const getLastWeekCreditDebit = async () => {
        setApiStatus(apiStatusConstants.inProgress)
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
        //   const updatedData = getFormattedData(fetchedData.users[0])
          console.log(fetchedData)
        //   console.log(updatedData)
        //   setProfileData(updatedData)
          setApiStatus(apiStatusConstants.success)
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      }

      const renderProfile = () =>{

        return (
            <div className='chart'>
                  <h1>chart</h1>
            </div>
        )
      }

    
      const renderProfileData = () => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderProfile()
          case apiStatusConstants.failure:
            return FailureView()
          case apiStatusConstants.inProgress:
            return LoadingView()
          default:
            return null
        }
      }

  return (
    <div className='main-container-profile'>
      
        <h1 className='accounts-head'>chart</h1>
        {renderProfileData()}
    </div>
  )
}

export default ReactChart