import { MissingParamError } from '../errors/missing_param_error'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http_helpers'
import { Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return badRequest(new MissingParamError('Not verified'))
  }
}
