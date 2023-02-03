// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'

export type DespesaParcelaLayoutType = {
  id: string
}

export type DespesaParcelaType = {
  id?: string
  dataVencimento: Date
  parcelaNumero: string
  diasEntreParcelas: string
  saldoInicial: string
  saldoFinal: string
  juros: string
  amortizacao: string
  valorParcela: string
  despesaId: string
  despesa: DespesaType
  status: string
  avatarColor?: ThemeColor
}