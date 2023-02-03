// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

export type DespesaLayoutType = {
  id: string
}

export type DespesaType = {
  id?: string
  formaPagamento: string
  sistemaParcelado: string
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
  cliente: ClienteType
  status: string
  avatarColor?: ThemeColor
}