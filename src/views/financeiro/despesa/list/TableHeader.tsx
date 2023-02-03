import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

// ** Import Toast
import 'react-toastify/dist/ReactToastify.css'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Grid } from '@mui/material'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const ability = useContext(AbilityContext)

  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Grid xs={12} md={12} lg={12} sx={{ p: 5, position: 'relative' }}>
      <TextField
        size='small'
        value={value}
        sx={{ width: 'calc(100% - 100px)' }}
        variant='outlined'
        placeholder={'Busca despesa pelo nome fantasia do cliente'}
        onChange={e => handleFilter(e.target.value)}
      />
      {ability?.can('create', 'ac-despesa-page') ? (
        <Tooltip title={'Adicionar nova despesa'}>
          <Button
            sx={{ mr: 4, position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            onClick={toggle}
            variant='contained'
          >
            + Novo
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default TableHeader
