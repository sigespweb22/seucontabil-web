// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type ClienteLayoutType = {
  id: string
}

export type ClienteType = {
  id?: string
  nome: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  tipoPessoa: string
  cnpj: string | undefined
  cpf: string | undefined
  telefonePrincipal: string
  emailPrincipal: string
  observacao: string
  dataFundacao: string
  codigoMunicipio: number
  rua: string
  numero: string
  complemento: string
  cidade: string
  estado: string
  cep: string
  status: string
  avatarColor?: ThemeColor
}

export type ClienteToAutoCompleteType = {
  id: string
  nomeFantasia: string
}