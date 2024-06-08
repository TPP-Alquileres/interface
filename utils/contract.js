export const ContractStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CLAIM: "CLAIM",
  CLAIM_DECLINED: "CLAIM_DECLINED",
  CLAIM_ACCEPTED: "CLAIM_ACCEPTED",
  CLOSE: "CLOSE",
};

export const ContractStatusToDisplay = {
  [ContractStatus.PENDING]: "Pendiente",
  [ContractStatus.ACTIVE]: "Activo",
  [ContractStatus.CLAIM]: "En reclamo",
  [ContractStatus.CLAIM_DECLINED]: "Reclamo rechazado",
  [ContractStatus.CLAIM_ACCEPTED]: "Reclamo aceptado",
  [ContractStatus.CLOSE]: "Finalizado",
};
