// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import DespesaViewLeft from 'src/views/financeiro/despesa/view/DespesaViewLeft'
import DespesaViewRight from 'src/views/financeiro/despesa/view/DespesaViewRight'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
  despesaId: string
}

const DespesaViewPage = ({ despesaId }: Props) => {
  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  
  if (despesaId) {
    return (    
      <Grid container spacing={6}>
        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={5} lg={4}>
            <DespesaViewLeft id={despesaId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}

        {ability?.can('read', 'ac-cliente-page') ? (
          <Grid item xs={12} md={7} lg={8}>
            <DespesaViewRight id={despesaId} />
          </Grid>
        ) : <>{t("You do not have permission to view this resource.")}</>}
      </Grid>
    )
  } else {
    return null
  }
}

DespesaViewPage.acl = {
  action: 'read',
  subject: 'ac-despesa-page'
}

export default DespesaViewPage