// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ClienteToAutoCompleteType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { PessoaToAutoCompleteType } from 'src/types/sistema/pessoa/pessoaTypes'

export type DespesaLayoutType = {
  id: string
}

export type DespesaType = {
  id?: string
  formaPagamento: string
  sistemaParcelamento: string
  totalParcelas: number
  dataOperacao: string | null
  dataVencimentoPrimeiraParcela: string | null
  valorPrincipal: number
  iof: number
  seguro: number
  tarifa: number
  custoEfetivoTotalAno: number
  custoEfetivoTotalMes: number
  custoEfetivoTotalDia: number
  valorEntrada: number
  valorParcelado: number
  valorParcela: number
  clienteId: string
  pessoaId: string
  pessoa: PessoaToAutoCompleteType
  cliente: ClienteToAutoCompleteType
  saldo: number
  status: string
  avatarColor?: ThemeColor
}
