// ** React Imports
import { useState, ChangeEvent, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { Autocomplete } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { toast, ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addDespesa } from 'src/store/financeiro/despesa/index'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'

// ** Axios Imports
import axios from 'axios'

// ** Api Services
import pessoaApiService from 'src/@api-center/sistema/pessoa/pessoaApiService'
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import enumApiService from 'src/@api-center/sistema/enum/enumServicoApiService'

interface DespesaAddDrawerType {
  open: boolean
  toggle: () => void
}

interface GenericModelToSelect2Interface {
  id: string
  nome: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  tipoPessoa: '',
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
  valorTotal: 0,
  valorParcela: 0,
  cliente: '',
  clienteId: '',
  pessoa: '',
  pessoaId: '',
  saldo: '',
  status: ''
}

const defaultValuesCliente: { id: string, nome: string  }[] = [];
const defaultValuesPessoa: { id: string, nome: string  }[] = [];

const DespesaAddDrawer = (props: DespesaAddDrawerType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const { t } = useTranslation()
  const [cnpjToSearch, setCnpjToSearch] = useState('')

  // ** State
  const [pessoas, setPessoas] = useState<GenericModelToSelect2Interface[]>(defaultValuesPessoa);
  const [clientes, setClientes] = useState<GenericModelToSelect2Interface[]>(defaultValuesCliente);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [sistemasParcelamento, setSistemasParcelamento] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(enumApiService.storageTokenKeyName)!}`
    }
  }

  // ** get pessoas
  useEffect(() => {
    const getPessoas = axios.get(`${pessoaApiService.listToSelectByNaturezaAsync}?naturezaPessoa=CREDOR`, config)

    getPessoas
      .then(response => {
        if (response.status == 200) setPessoas(response.data)
      })
      .catch(resp => {
        if (resp.message == 'Network Error') return toast.error('Você não tem permissão para esta ação.')

        if (typeof resp.response.data != 'undefined') {
          try {
            if (resp.response.status?.toString().match(/\d+/)[0] === '0') toast.error('Ops! Algo deu errado.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '404') toast.error('Nenhum cliente encontrado para criar uma despesa.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '400') resp.response.data.errors.map((x: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => toast.error(x))
          } catch (e) {
            `${e}<br>Ops! Algo deu errado.`
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ** get clientes
  useEffect(() => {
    const getClientes = axios.get(`${clienteApiService.listToSelectAsync}`, config)

    getClientes
      .then(response => {
        debugger
        if (response.status == 200) setClientes(response.data)
      })
      .catch(resp => {
        if (resp.message == 'Network Error') return toast.error('Você não tem permissão para esta ação.')

        if (typeof resp.response.data != 'undefined') {
          try {
            if (resp.response.status?.toString().match(/\d+/)[0] === '0') toast.error('Ops! Algo deu errado.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '404') toast.error('Nenhum cliente encontrado para criar uma despesa.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '400') resp.response.data.errors.map((x: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => toast.error(x))
          } catch (e) {
            `${e}<br>Ops! Algo deu errado.`
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ** get formas pagamento
  useEffect(() => {
    const getFormasPagamento = axios.get(`${enumApiService.formasPagamentoListAsync}`, config)

    getFormasPagamento
      .then(response => {
        if (response.status == 200) setFormasPagamento(response.data)
      })
      .catch(resp => {
        if (resp.message == 'Network Error') return toast.error('Você não tem permissão para esta ação.')

        if (typeof resp.response.data != 'undefined') {
          try {
            if (resp.response.status?.toString().match(/\d+/)[0] === '0') toast.error('Ops! Algo deu errado.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '404') toast.error('Nenhum cliente encontrado para criar uma despesa.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '400') resp.response.data.errors.map((x: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => toast.error(x))
          } catch (e) {
            `${e}<br>Ops! Algo deu errado.`
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ** get sistemas parcelamento
  useEffect(() => {
    const getSistemasParcelamento = axios.get(`${enumApiService.sistemasParcelamentoListAsync}`, config)

    getSistemasParcelamento
      .then(response => {
        if (response.status == 200) setSistemasParcelamento(response.data)
      })
      .catch(resp => {
        if (resp.message == 'Network Error') return toast.error('Você não tem permissão para esta ação.')

        if (typeof resp.response.data != 'undefined') {
          try {
            if (resp.response.status?.toString().match(/\d+/)[0] === '0') toast.error('Ops! Algo deu errado.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '404') toast.error('Nenhum cliente encontrado para criar uma despesa.')
            if (resp.response.status?.toString().match(/\d+/)[0] === '400') resp.response.data.errors.map((x: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => toast.error(x))
          } catch (e) {
            `${e}<br>Ops! Algo deu errado.`
          }
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch<AppDispatch>()

  const {
    reset,
    control,
    handleSubmit
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = (data: DespesaType) => {
    dispatch(addDespesa({ ...data }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCnpjToSearch(event.target.value)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Nova Despesa</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Grid container spacing={0} sx={{ pl: 2, pt: 2, pr: 2, pb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12}>
            <Alert sx={{ mb: '20px' }} severity='warning'>
              Para gerar automaticamente as parcelas, informe o tipo de sistema de parcelamento.
            </Alert>
          </Grid>
          <Grid>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="cliente"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Autocomplete
                      sx={{ width: 360 }}
                      options={clientes || []}
                      onChange={(event, newValue) => {
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      getOptionLabel={option => option.nome}
                      renderInput={params => <TextField {...params} label='Cliente' />}
                    />
                  )
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="pessoa"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Autocomplete
                      sx={{ width: 360 }}
                      options={pessoas || []}
                      onChange={(event, newValue) => {
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      getOptionLabel={option => option.nome}
                      renderInput={params => <TextField {...params} label='Credor' />}
                    />
                  )
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='dataOperacao'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} onChange={onChange} type='date' label="Data realização operação" />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='valorPrincipal'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Valor principal'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 250000.00)'
                  />
                )}
              />
            </FormControl> 
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='valorEntrada'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Valor entrada'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 100000.00)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='saldo'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Saldo'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 150000.00)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='iof'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Iof'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 4566.59)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='seguro'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Seguro'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 1000.00)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='tarifa'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Tarifa'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 2615.00)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='valorTotal'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Valor Total'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 280000.00)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='custoEfetivoTotalAno'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='CET ao ano'
                    onChange={onChange}
                    placeholder='(e.g.: 15.45)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='custoEfetivoTotalMes'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='CET ao mês'
                    onChange={onChange}
                    placeholder='(e.g.: 1.204423)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='custoEfetivoTotalDia'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='CET ao dia'
                    onChange={onChange}
                    placeholder='(e.g.: 0.039916)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='formaPagamento'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={value}
                      options={formasPagamento}
                      onChange={(event, newValue) => {
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      renderInput={params => <TextField {...params} label={"Formas parcelamento"} />}
                    />
                  )
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='totalParcelas'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Número parcelas'
                    onChange={onChange}
                    placeholder='(e.g.: 48)'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='sistemaParcelamento'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={value}
                      options={sistemasParcelamento}
                      onChange={(event, newValue) => {
                        onChange(newValue)
                      }}
                      id='autocomplete-controlled'
                      renderInput={params => <TextField {...params} label={"Sistema parcelamento"} />}
                    />
                  )
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='valorParcela'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    type="number"
                    label='Valor parcela'
                    onChange={onChange}
                    placeholder='(e.g.: R$ 6501.25)'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              {t('Save')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Grid>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
DespesaAddDrawer.acl = {
  action: 'create',
  subject: 'ac-despesa-page'
}

export default DespesaAddDrawer
