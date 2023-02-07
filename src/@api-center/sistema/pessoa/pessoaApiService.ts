import env from '../../../environment';

const apiPessoas = `${env.API_URL}/pessoas`

export default {
  listToSelectByNaturezaAsync: `${apiPessoas}/list-to-select`,
  storageTokenKeyName: 'accessToken'
}