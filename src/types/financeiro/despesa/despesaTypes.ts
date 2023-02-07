// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'
import { PessoaType } from 'src/types/sistema/pessoa/pessoaTypes'

export type DespesaLayoutType = {
  id: string
}

export type DespesaType = {
  id?: string
  tipoPessoa: string
  formaPagamento: string
  sistemaParcelamento: string
  totalParcelas: number
  dataOperacao: string
  valorPrincipal: number
  iof: number
  seguro: number
  tarifa: number
  custoEfetivoTotalAno: number
  custoEfetivoTotalMes: number
  custoEfetivoTotalDia: number
  valorEntrada: number
  valorParcelado: number
  clienteId: string
  pessoaId: string
  pessoa: PessoaType
  cliente: ClienteType
  status: string
  avatarColor?: ThemeColor
}