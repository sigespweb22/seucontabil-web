// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import despesaApiService from 'src/@api-center/financeiro/despesa/despesaApiService'

// ** Types
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'

// ** Toast
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Despesas
export const fetchData = createAsyncThunk('appDespesas/fetchData', async (params: DataParams) => {
  const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
  const response = await axios
                            .get(despesaApiService.listAsync, {
                                  headers: {
                                    Authorization: "Bearer " + storedToken
                                  },
                                  params
                            })

  return response.data
})

// ** Add Despesa
export const addDespesa = createAsyncThunk(
  'appDespesas/addDespesa',
  async (data: DespesaType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.post(despesaApiService.addAsync, data, config).then((resp) => {
      
      dispatch(fetchData(getState().despesa.params))
      if (resp.status === 201 && resp.data.message) return toast.success(resp.data.message)
      if (resp.status === 201) return toast.success("Despesa criada com sucesso.")

    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data.title != 'undefined' &&
            resp.response.data.title === "One or more validation errors occurred.")
        {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err[1].toString())
          });
        } else {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err.toString())
          });
        }
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

// ** Update Despesa
export const editDespesa = createAsyncThunk(
  'appDespesas/editDespesa',
  async (data : DespesaType, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(despesaApiService.updateAsync, data, config).then((resp) => {

      dispatch(fetchData(getState().despesa.params))
      if (resp.status === 204) return toast.success("Despesa atualizado com sucesso.")

    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        if (typeof resp.response.data.title != 'undefined' &&
            resp.response.data.title === "One or more validation errors occurred.")
        {
          const returnObj = Object.entries(resp.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err[1].toString())
          });
        } else {
          resp.response.data.errors.forEach((err: any) => {
            toast.error(err.toString())
          });
        }
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

// ** Delete Despesa
export const deleteDespesa = createAsyncThunk(
  'appDespesas/deleteDespesa',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
    
    const headers = {
      Authorization: "Bearer " + storedToken
    }

    axios.delete(despesaApiService.deleteAsync+id, { headers }).then((resp) => {

      dispatch(fetchData(getState().despesa.params))
      if (resp.status === 204) return toast.success("Despesa deletado com sucesso.")

    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err[1].toString())
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

// ** Alter Status Despesa
export const alterStatusDespesa = createAsyncThunk(
  'appDespesas/alterStatusDespesa',
  async (id: number | string | undefined, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(despesaApiService.storageTokenKeyName)!
    
    const config = {
      headers: {
        Authorization: "Bearer " + storedToken
      }
    }

    axios.put(despesaApiService.alterStatusAsync+id, null, config).then((resp) => {

      dispatch(fetchData(getState().despesa.params))
      toast.success(resp.data.message)
      
      return resp.data.data

    }).catch((resp) => {
      if (resp.message == 'Network Error') return toast.error("Você não tem permissão para esta ação.")
      if (typeof resp.response.data != 'undefined' && 
          typeof resp.response.data.errors != 'undefined')
      {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err[1].toString())
        });
      } else {
        const returnObj = Object.entries(resp.response.data.errors);
        returnObj.forEach((err: any) => {
          err[1].forEach((ie: any) => {
            toast.error(ie.toString())        
          })
        });
      }
    })
  }
)

export const appDespesasSlice = createSlice({
  name: 'appDespesas',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.despesas
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appDespesasSlice.reducer