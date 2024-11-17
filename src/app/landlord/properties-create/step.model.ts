export interface Step {
  id: string | null,
  idNext: string | null,
  idPrevious: string | null,
  isValid: boolean,
}
