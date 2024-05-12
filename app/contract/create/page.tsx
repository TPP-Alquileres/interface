"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ContractCreate } from "@/components/contract-create";
import { abi } from '../../../abi';

export default function CreateContractPage() {
  const { data: session } = useSession();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate,] = useState("");
  const [amount, setamount] = useState("");

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const onChangeHandler = (event: any) => {
    const value = event.target.value;
    const event_id = event.target.id;
    if (event_id === "name") { setDescription(value); }
    if (event_id === "start-date") { setStartDate(value); }
    if (event_id === "end-date") { setEndDate(value); }
    if (event_id === "amount") { setamount(value); }
  };

  const generateLink = () => {
    const body = { description, start_date: startDate, end_date: endDate, amount };
    setLoading(true);

    fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', user_id: session.user.id },
      body: JSON.stringify(body),
    }).then((res) => 
      res.json()
    ).then((data) => {
      writeContract({ address: process.env.NEXT_PUBLIC_RENT_INSURANCE_ADDRESS, abi, functionName: 'initializeInsurance',
        args: [BigInt(amount), BigInt(2)],
      });
      setData(data);
      setLoading(false);
    });
  }

  if (isPending || isLoading) return <p>Cargando ...</p>;

  if (isConfirming) return <p>Confirmando ...</p>

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
      amount={amount}
      onChange={onChangeHandler}
    />
  )
}