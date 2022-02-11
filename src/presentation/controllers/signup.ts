import { MissingParamError } from '../errors/missing_param_error'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http_helpers'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email_validator'
import { InvalidParamError } from '../errors/invalid_param_error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body?.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return badRequest(new InvalidParamError('undefined'))
    } catch (error) {
      return serverError()
    }
  }
}
