"use client"

import { ContractCreate } from "@/components/contract-create"
import { useState, useEffect } from 'react'


export default function Component() {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate,] = useState("");
  const [ammount, setAmmount] = useState("");


  const onChangeHandler = event => {
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
  };


  
  let generateLink = () => {

    let body = {
      "owner_id": 1,
      "description": "hola don pepito",
      "start_date": 1713797894,
      "end_date": 1713797894,
      "ammount": 10.4,
      "document_url": "hola.com"
    }

    fetch('/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

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