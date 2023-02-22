// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import { useForm } from 'react-hook-form'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'
import { PessoaToAutoCompleteType } from 'src/types/sistema/pessoa/pessoaTypes'
import { ClienteToAutoCompleteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { formatCurrency } from 'src/@core/utils/format'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Actions Imports
import { fetchDataById } from 'src/store/financeiro/despesa/view/index'

// ** Store Imports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment';

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'error'
}

interface Props {
  id: string
}

const pessoaDefaultValues: PessoaToAutoCompleteType = {
  id: '',
  nomeFantasia: ''
}

const clienteDefaultValues: ClienteToAutoCompleteType = {
  id: '',
  nomeFantasia: '',
}

const defaultValues: DespesaType = {
  id: '',
  formaPagamento: '',
  sistemaParcelamento: '',
  totalParcelas: 0,
  dataOperacao: null,
  dataVencimentoPrimeiraParcela: null,
  valorPrincipal: 0,
  iof: 0,
  seguro: 0,
  tarifa: 0,
  custoEfetivoTotalAno: 0,
  custoEfetivoTotalMes: 0,
  custoEfetivoTotalDia: 0,
  valorEntrada: 0,
  valorParcelado: 0,
  valorParcela: 0,
  clienteId: '',
  pessoaId: '',
  pessoa: pessoaDefaultValues,
  cliente: clienteDefaultValues,
  saldo: 0,
  status: '',
  avatarColor: 'primary'
}

const DespesaViewLeft = ({id}: Props) => {
  // ** Hooks
  const { t } = useTranslation()

  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.despesaView)
  const [despesaView, setDespesaView] = useState<DespesaType>(defaultValues)

  const {
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    dispatch(
      fetchDataById({
        id: id
      })
    )
  }, [dispatch, id])

  useEffect(() => {
    if(store)
    {
      setDespesaView(store.data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  const renderClienteAvatar = () => {
    if (store) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={'primary' as ThemeColor}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {getInitials(despesaView.cliente.nomeFantasia|| "CP")}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  if (store) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderClienteAvatar()}
              <Typography sx={{ mb: 2, textAlign: 'center', fontSize: '20px' }}>
                {despesaView.cliente.nomeFantasia}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={despesaView.cliente.nomeFantasia}
                color='primary'
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>{t("Details")}</Typography>
              <Divider />
              <Box sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Forma pagamento:</Typography>
                  <Typography variant='body2'>{despesaView.formaPagamento}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Sistema parcelamento:</Typography>
                  <Typography variant='body2'>{despesaView.sistemaParcelamento.replace("_", " ")}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Total parcelas:</Typography>
                  <Typography variant='body2'>{despesaView.totalParcelas}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Data operação:</Typography>
                  <Typography variant='body2'>{moment(despesaView.dataOperacao, 'DD/MM/YYYY HH:mm:ss Z').startOf('day').format('DD/MM/YYYY')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Valor principal:</Typography>
                  <Typography variant='body2'>{formatCurrency(despesaView.valorPrincipal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Iof:</Typography>
                  <Typography variant='body2'>{despesaView.iof}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Seguro:</Typography>
                  <Typography variant='body2'>{despesaView.seguro}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Tarifa:</Typography>
                  <Typography variant='body2'>{despesaView.tarifa}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Custo efetivo total (Ao ano):</Typography>
                  <Typography variant='body2'>{despesaView.custoEfetivoTotalAno}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Custo efetivo total (Ao mês):</Typography>
                  <Typography variant='body2'>{despesaView.custoEfetivoTotalMes}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Custo efetivo total (Ao dia):</Typography>
                  <Typography variant='body2'>{despesaView.custoEfetivoTotalDia}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Valor entrada:</Typography>
                  <Typography variant='body2'>{formatCurrency(despesaView.valorEntrada)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Valor parcelado:</Typography>
                  <Typography variant='body2'>{formatCurrency(despesaView.valorParcelado)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Valor parcela:</Typography>
                  <Typography variant='body2'>{despesaView.valorParcela}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Data vencimento primeira parcela:</Typography>
                  <Typography variant='body2'>{moment(despesaView.dataVencimentoPrimeiraParcela, 'DD/MM/YYYY HH:mm:ss Z').startOf('day').format('DD/MM/YYYY')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={`${t(store?.data.status)}`}
                    color={statusColors[store?.data.status]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            `Despesa com o id: ${id} não existe`
            <Link href='/pages/financeiro/despesa/list'>Listagem das despesas dos clientes</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

DespesaViewLeft.acl = {
  action: 'read',
  subject: 'ac-despesa-page'
}

export default DespesaViewLeft