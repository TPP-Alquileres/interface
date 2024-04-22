"use client"

import { ContractPending } from "@/components/contract-pending"
import { useState, useEffect } from 'react'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function Component(req: NextApiRequest, res: NextApiResponse) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {

    fetch('/api/contracts/f8871159-ddd4-4d14-9d17-5883677645c4')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <ContractPending />
  )
}