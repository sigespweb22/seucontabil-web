// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type PessoaLayoutType = {
  id: string
}

export type PessoaType = {
  id?: string
  nomeFantasia: string
  tipoPessoa: string
  naturezaPessoa: string
  status: string
  avatarColor?: ThemeColor
}

export type PessoaToAutoCompleteType = {
  id: string
  nomeFantasia: string
}