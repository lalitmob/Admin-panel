'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useProject from '@/app/api/project.api'
import ProjectCard from '@/app/components/Card'
import TermsAndConditions from '@/app/components/model/Terms'
const AcceptQuotation = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const {requestQuot} = useProject()
    const[data, setData] = useState([])
    useEffect(()=>{
       requestQuot(token, setData)
    },[token])
  return (
    <div className='flex bg-gray-100 flex-col items-center w-full h-screen'>
       <ProjectCard token={token} data = {data}/>
       <TermsAndConditions/>
    </div>
  )
}

export default AcceptQuotation