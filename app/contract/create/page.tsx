"use client"

import { ContractCreate } from "@/components/contract-create"

export default function Component() {

  let generateLink = () => {
    // console.log("holis")
    // TODO implement fetch
  }

  return (
    <ContractCreate 
      onGenerateLinkButtonClick={generateLink}
    />
  )
}