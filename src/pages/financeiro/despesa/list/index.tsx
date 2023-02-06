// ** React Imports
import { useContext, useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import ElevatorUp from 'mdi-material-ui/ElevatorUp'
import ElevatorDown from 'mdi-material-ui/ElevatorDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import Help from 'mdi-material-ui/Help'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import PageHeader from 'src/@core/components/page-header'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { formatCurrency } from 'src/@core/utils/format'

// ** Actions Imports
import { fetchData, alterStatusDespesa } from 'src/store/financeiro/despesa/index'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { DespesaType } from 'src/types/financeiro/despesa/despesaTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/financeiro/despesa/list/TableHeader'
import DespesaAddDrawer from 'src/views/financeiro/despesa/new/DespesaAddDrawer'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface DespesaKeyValuePairType {
  [key: string]: ThemeColor
}

interface CellType {
  row: DespesaType
}

const despesaStatusObj: DespesaKeyValuePairType = {
  ACTIVE: 'success',
  RECORRENTE: 'secondary'
}

const despesaFormaPagamentoObj: DespesaKeyValuePairType = {
  AVISTA: 'success',
  PARCELADA: 'info'
}

const despesaSistemaParcelamentoObj: DespesaKeyValuePairType = {
  AMORTIZACAO: 'success'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders cliente column
const renderClienteFromDespesa = (row: DespesaType) => {
  return (
    <AvatarWithoutImageLink href='#'>
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.cliente.nomeFantasia ? row.cliente.nomeFantasia : 'NF')}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

// ** renders forma pagamento column
const RenderFormaPagamento = ({ formaPagamento }: { formaPagamento: string }) => {
  return (
    <CustomChip
      skin='light'
      size='small'
      label={formaPagamento}
      color={despesaFormaPagamentoObj[formaPagamento]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

// ** renders sistema parcelamento column
const RenderSistemaParcelamento = ({ sistemaParcelamento }: { sistemaParcelamento: string }) => {
  return (
    <CustomChip
      skin='light'
      size='small'
      label={sistemaParcelamento}
      color={despesaSistemaParcelamentoObj[sistemaParcelamento]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

// ** renders status column
const RenderStatus = ({ status }: { status: string }) => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <CustomChip
      skin='light'
      size='small'
      label={t(status)}
      color={despesaStatusObj[status]}
      sx={{ textTransform: 'capitalize' }}
    />
  )
}

const defaultColumns = [
  {
    flex: 0.6,
    minWidth: 30,
    field: 'nome',
    headerName: 'Nome',
    headerAlign: 'left' as const,
    align: 'left' as const,
    renderCell: ({ row }: CellType) => {
      const { nomeFantasia, emailPrincipal } = row.cliente

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClienteFromDespesa(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {nomeFantasia}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
              📬{emailPrincipal}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: 'formaPagamento',
    headerName: 'Forma pagamento',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderFormaPagamento formaPagamento={row.formaPagamento} />
  },
  {
    flex: 0.24,
    minWidth: 50,
    field: 'sistemaParcelamento',
    headerName: 'Sistema parcelamento',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderSistemaParcelamento sistemaParcelamento={row.sistemaParcelamento} />
  },
  {
    flex: 0.17,
    minWidth: 100,
    field: 'totalParcelas',
    headerName: 'Total parcelas',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.totalParcelas}
        </Typography>
      )
    }
  },
  {
    flex: 0.18,
    minWidth: 100,
    field: 'valorPrincipal',
    headerName: 'Valor principal',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row.valorPrincipal)}
        </Typography>
      )
    }
  },
  {
    flex: 0.17,
    minWidth: 100,
    field: 'valorEntrada',
    headerName: 'Valor entrada',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row.valorEntrada)}
        </Typography>
      )
    }
  },
  {
    flex: 0.19,
    minWidth: 100,
    field: 'valorParcelado',
    headerName: 'Valor parcelado',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {formatCurrency(row.valorParcelado)}
        </Typography>
      )
    }
  },
  {
    flex: 0.14,
    minWidth: 50,
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center' as const,
    align: 'center' as const,
    renderCell: ({ row }: CellType) => <RenderStatus status={row.status} />
  }
]

const DespesaList = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [despesaAddOpen, setDespesaAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.despesa)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleAlterStatus = (id: string | undefined) => {
    dispatch(alterStatusDespesa(id))
  }

  const RenderButton = ({ id, status }: { id: string | undefined; status: string }) => {
    if (status === 'INACTIVE') {
      return (
        <Tooltip title={t('Activate')}>
          <IconButton onClick={() => handleAlterStatus(id)}>
            <ElevatorUp fontSize='small' />
          </IconButton>
        </Tooltip>
      )
    } else if (status === 'ACTIVE') {
      return (
        <Tooltip title={t('Deactivate')}>
          <IconButton onClick={() => handleAlterStatus(id)}>
            <ElevatorDown fontSize='small' />
          </IconButton>
        </Tooltip>
      )
    } else {
      return (
        <IconButton onClick={() => handleAlterStatus(id)}>
          <Help fontSize='small' />
        </IconButton>
      )
    }
  }

  const toggleDespesaAddDrawer = () => setDespesaAddOpen(!despesaAddOpen)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.25,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center' as const,
      align: 'center' as const,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('read', 'ac-cliente-page') && (
            <Link href={`/financeiro/despesa/view/${row.id}`} passHref>
              <Tooltip title={t('View')}>
                <IconButton>
                  <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {ability?.can('update', 'ac-cliente-page') && (
            <Tooltip title={t('Edit')}>
              <Link href={`/negocios/comercial/cliente/edit/${row.id}`} passHref>
                <IconButton>
                  <PencilOutline fontSize='small' />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {ability?.can('update', 'ac-cliente-page') && <RenderButton id={row.id} status={row.status} />}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Despesas</Typography>}
          subtitle={<Typography variant='body2'>Listagem das despesas de clientes.</Typography>}
        />
      </Grid>
      {ability?.can('list', 'ac-cliente-page') ? (
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleDespesaAddDrawer} />
            <DataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              autoHeight
              rows={store.data}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      ) : (
        <>{t('You do not have permission to view this resource.')}</>
      )}
      {ability?.can('create', 'ac-despesa-page') ? (
        <DespesaAddDrawer open={despesaAddOpen} toggle={toggleDespesaAddDrawer} />
      ) : (
        <></>
      )}
    </Grid>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
DespesaList.acl = {
  action: 'list',
  subject: 'ac-despesa-page'
}

export default DespesaList
