"use client"

import { ContractCreate } from "@/components/contract-create"
import { useState, useEffect } from 'react'


export default function Component() {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate,] = useState("");
  const [ammount, setAmmount] = useState("");

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)



  const onChangeHandler = (event: any) => {
    console.log(event.target.id)
    let value = event.target.value
    if (event.target.id === "name") {
      setDescription(value);
    }
    if (event.target.id === "start-date") {
      setStartDate(value)
    }
    if (event.target.id === "end-date") {
      setEndDate(value)
    }
    if (event.target.id === "ammount") {
      setAmmount(value)
    }
  };
  
  let generateLink = () => {
    let body = {
      "owner_id": 1,
      "description": description,
      "start_date": 1713797894,
      "end_date": 1713797894,
      "ammount": 10.4,
      "document_url": "hola.com"
    }
    setLoading(true)
    fetch('/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
  }

  if (isLoading) return <p>Cargando ...</p>

  if (data) return (
    <div>
    <h1>
      Link generado
    </h1>
    <p>
      Mandale este link a tu inquilino para que pueda abrirlo y firmarlo
    </p>
    <p>
      {`http://localhost:3000/contract/pending?contract_id=/${String(data.id)}`}
    </p>
  </div>
  )

  return (
    <ContractCreate 
      onGenerateLinkButtonClick={generateLink}
      description={description}
      startDate={startDate}
      endDate={endDate}
      ammount={ammount}
      onChange={onChangeHandler}
    />
  )
}