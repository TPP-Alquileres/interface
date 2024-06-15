export const rentAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_rentInsurance", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "RENT_INSURANCE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IRentInsurance",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "collectInsurance",
    inputs: [
      { name: "_insuranceId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initializeRent",
    inputs: [
      { name: "_insuranceId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "payRent",
    inputs: [
      { name: "_insuranceId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rents",
    inputs: [{ name: "insuranceId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "nextPayment", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "RentInitialized",
    inputs: [
      {
        name: "insuranceId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RentPaid",
    inputs: [
      {
        name: "insuranceId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "NotAuthorized", inputs: [] },
  { type: "error", name: "RentNotDue", inputs: [] },
] as const;
