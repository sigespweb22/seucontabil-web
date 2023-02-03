import { useRouter } from 'next/router'
import DespesaViewPage from 'src/views/financeiro/despesa/view/DespesaViewPage'

const DespesaViewRoute = () => {
  const router = useRouter()
  const { id } = router.query

  return <DespesaViewPage despesaId={String(id)}/>
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
DespesaViewRoute.acl = {
  action: 'read',
  subject: 'ac-despesa-page'
}

export default DespesaViewRoute