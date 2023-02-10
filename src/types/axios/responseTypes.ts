interface Errors {
  errors: string[]
}

interface ResponseInterfaceType {
  data: Errors
  status: string
}

export type ResponseType = {
  message: string
  response: ResponseInterfaceType
}