// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import despesaApiService from 'src/@api-center/financeiro/despesa/despesaApiService'

// ** Types
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'
import { ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  id: string
}

// ** Fetch Despesa by id
export const fetchDataById = createAsyncThunk('appDespesaView/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
  const response = await axios
                            .get(`${despesaApiService.listOneAsync}${params.id}`, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  }
                            })

  return response.data
})

const clienteDefaultValue: ClienteType = {
  id: '',
  nomeFantasia: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  tipoPessoa: '',
  cnpj: '',
  cpf: '',
  telefonePrincipal: '',
  emailPrincipal: '',
  observacao: '',
  dataFundacao: '',
  codigoMunicipio: 0,
  rua: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
  status: ''
}

const defaultValues: DespesaType = {
  id: '',
  formaPagamento: '',
  sistemaParcelamento: '',
  totalParcelas: 0,
  dataOperacao: '',
  valorPrincipal: 0,
  iof: 0,
  seguro: 0,
  tarifa: 0,
  custoEfetivoTotalAno: 0,
  custoEfetivoTotalMes: 0,
  custoEfetivoTotalDia: 0,
  valorEntrada: 0,
  valorParcelado: 0,
  cliente: clienteDefaultValue,
  clienteId: '',
  status: '',
  avatarColor: 'primary'
}

export const appDespesaViewSlice = createSlice({
  name: 'appDespesaView',
  initialState: {
    data: defaultValues,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDataById.fulfilled, (state, action) => {
      state.data = action.payload.despesa
      state.params = action.payload.params
    })
  }
})

export default appDespesaViewSlice.reducer