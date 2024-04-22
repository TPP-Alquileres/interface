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
    setLoading(true)
    fetch(`/api/contracts/${contractId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tenantId": 2,
        "state": "ACTIVE"
      }),
    }).then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
  }
 
  if (isLoading) return <p>Cargando ...</p>
  if (data.state === 'ACTIVE') return <p>Este contrato ya fue firmado!!</p>
  if (!data || data.state != 'PENDING') return <p>No existe contrato a firmar</p>
  console.log(data.description)
  return (
    <ContractPending 
      description={data.description}
      onSignContractButtonClick={onSignContractButtonClick}
      />
  )
}