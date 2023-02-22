// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import MuiTab, { TabProps } from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'

// ** Icons Imports
import BallotRecountOutline from 'mdi-material-ui/BallotRecountOutline'

// ** Custom Components Imports
import DespesaParcelaTableListToView from 'src/views/financeiro/despesa-parcela/list/DespesaParcelaTableListToView'
import { useTranslation } from 'react-i18next'

interface Props {
  id: string
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3)
  }
}))

const DespesaViewRight = ({ id }: Props) => {
  // ** State
  const [value, setValue] = useState<string>('parcelas')
  const { t } = useTranslation()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='parcelas' label="PARCELAS" icon={<BallotRecountOutline />} />v
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='parcelas'>
          <DespesaParcelaTableListToView id={id} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

DespesaViewRight.acl = {
  action: 'read',
  subject: 'ac-despesa-page'
}

export default DespesaViewRight