import { TServiceRes, TServiceResWithoutContent } from 'infrastructure/types/TServiceRes';
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
  uniqueServiceErrorRes(success: boolean, code: number, message: string): TServiceResWithoutContent {
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
  ): TServiceRes {
    return {
      Success: success,
      Message: message,
      Code: code,
      Content: content,
    };
  }

  uniqueSuccessRes(content: Object): TServiceRes {
    return this.uniqueServiceRes(SUCCESS_TRUE, CODE_200, SUCCESS, content);
  }

  userSessionNotFound(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_404,
      USER_SESSION_NOT_FOUND,
    );
  }
  usersSessionSuccessDelete(): TServiceRes {
    return this.uniqueServiceRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_SESSION_DELETE,
      {},
    );
  }
  

  polisSuccessAdded(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      CLIENT_POLIS_SUCCESSFULLY_ADDED,
    );
  }
  passwordMismatch(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      PASSWORD_MISMATCH,
    );
  }

  polisAlreadyExists(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      CLIENT_POLIS_ALREADY_EXISTS,
    );
  }

  documnetsNotFound(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      DOCUMENTS_NOT_FOUND,
    );
  }

  documentsAddSuccessfully(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      DOCUMENTS_ADD_SUCCESSFULLY,
    );
  }

  documentsAlreadyExists(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      DOCUMENTS_ALREADY_EXISTS,
    );
  }
  
  userNotFound(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_404,
      USER_DOESNT_EXIST,
    );
  }
  passwordSuccessUpdate(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_PASSWORD_SUCCESS,
    );
  }
  userAlreadyExist(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      USER_ALREADY_EXIST,
    );
  }
  userSuccessfulyCreated(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_TRUE,
      CODE_200,
      USER_SUCCESSFULLY_CREATED,
    );
  }
  userNotAuthorisated(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_403,
      USER_NOT_AUTHORISATE,
    );
  }
  
  internalServerError(): TServiceResWithoutContent {
    return this.uniqueServiceErrorRes(
      SUCCESS_FALSE,
      CODE_500,
      INTERNAL_SERVER_ERROR,
    );
  }



}
