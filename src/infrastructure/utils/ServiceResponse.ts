import {
  USER_DOESNT_EXIST,
  USER_ALREADY_EXIST,
  USER_SUCCESSFULLY_CREATED,
  USER_NOT_AUTHORISATE,
  CODE_200,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
  DOCUMENTS_ADD_SUCCESSFULLY,
  DOCUMENTS_NOT_FOUND,
  DOCUMENTS_ALREADY_EXISTS,
  CLIENT_POLIS_SUCCESSFULLY_ADDED,
  CLIENT_POLIS_ALREADY_EXISTS,
  USER_PASSWORD_SUCCESS,
  PASSWORD_MISMATCH,
  
  USER_SESSION_NOT_FOUND,
  USER_SESSION_DELETE,
} from './messageConstants';
import { CODE_403, CODE_500, CODE_404 } from './messageConstants';
import { SUCCESS_FALSE, SUCCESS_TRUE} from './messageConstants';

export class ServiceResponse {
  uniqueServiceErrorRes(success: boolean, code: number, message: string) {
    return {
      Success: success,
      Message: message,
      Code: code,
    };
  }

  uniqueServiceRes(
    success: boolean,
    code: number,
    message: string,
    content: object,
  ) {
    return {
      Success: success,
      Message: message,
      Code: code,
      Content: content,
    };
  }

  uniqueSuccessRes(content: Object) {
    return this.uniqueServiceRes(SUCCESS_TRUE, CODE_200, SUCCESS, content);
  }

  userSessionNotFound() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_404,
      USER_SESSION_NOT_FOUND,
    );
  }
  usersSessionSuccessDelete() {
    return this.uniqueServiceRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_SESSION_DELETE,
      {},
    );
  }
  

  polisSuccessAdded() {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      CLIENT_POLIS_SUCCESSFULLY_ADDED,
    );
  }
  passwordMismatch() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      PASSWORD_MISMATCH,
    );
  }

  polisAlreadyExists() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      CLIENT_POLIS_ALREADY_EXISTS,
    );
  }

  documnetsNotFound() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      DOCUMENTS_NOT_FOUND,
    );
  }

  documentsAddSuccessfully() {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      DOCUMENTS_ADD_SUCCESSFULLY,
    );
  }

  documentsAlreadyExists() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      DOCUMENTS_ALREADY_EXISTS,
    );
  }
  
  userNotFound() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_404,
      USER_DOESNT_EXIST,
    );
  }
  passwordSuccessUpdate() {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_PASSWORD_SUCCESS,
    );
  }
  userAlreadyExist() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      USER_ALREADY_EXIST,
    );
  }
  userSuccessfulyCreated() {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_SUCCESSFULLY_CREATED,
    );
  }
  userNotAuthorisated() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      USER_NOT_AUTHORISATE,
    );
  }
  
  internalServerError() {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_500,
      INTERNAL_SERVER_ERROR,
    );
  }



}
