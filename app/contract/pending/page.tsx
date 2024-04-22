"use client"

import { ContractPending } from "@/components/contract-pending"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Component() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const contractId = String(searchParams.get('contract_id'))

  useEffect(() => {
    fetch(`/api/contracts/${String(contractId)}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  let onSignContractButtonClick = () =>  {
    console.log("tengo que firmar el documento")
  }
 
  if (isLoading) return <p>Cargando ...</p>
  if (!data) return <p>No existe contrato</p>
  console.log(data.description)
  return (
    <ContractPending 
      description={data.description}
      onSignContractButtonClick={onSignContractButtonClick}
      />
  )
}