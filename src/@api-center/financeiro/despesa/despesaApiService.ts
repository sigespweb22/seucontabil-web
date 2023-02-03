import env from '../../../environment';

const apiDespesas = `${env.API_URL}/despesas`

export default {
  listOneTPAsync: `${apiDespesas}/tp/`,
  listToSelectAsync: `${apiDespesas}/list-to-select`,
  listAsync: `${apiDespesas}/list`,
  listByClienteIdAsync: `${apiDespesas}/list-by-clienteId`,
  listOneAsync: `${apiDespesas}/list-one/`,
  addAsync: `${apiDespesas}/create`,
  deleteAsync: `${apiDespesas}/delete/`,
  alterStatusAsync: `${apiDespesas}/alter-status/`,
  updateAsync: `${apiDespesas}/update`,
  storageTokenKeyName: 'accessToken'
}