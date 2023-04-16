import { TServiceRes, TServiceResWithoutContent } from 'infrastructure/types/TServiceRes';
export declare class ServiceResponse {
    uniqueServiceErrorRes(success: boolean, code: number, message: string): TServiceResWithoutContent;
    uniqueServiceRes(success: boolean, code: number, message: string, content: object): TServiceRes;
    uniqueSuccessRes(content: Object): TServiceRes;
    userSessionNotFound(): TServiceResWithoutContent;
    usersSessionSuccessDelete(): TServiceRes;
    polisSuccessAdded(): TServiceResWithoutContent;
    passwordMismatch(): TServiceResWithoutContent;
    polisAlreadyExists(): TServiceResWithoutContent;
    documnetsNotFound(): TServiceResWithoutContent;
    documentsAddSuccessfully(): TServiceResWithoutContent;
    documentsAlreadyExists(): TServiceResWithoutContent;
    userNotFound(): TServiceResWithoutContent;
    passwordSuccessUpdate(): TServiceResWithoutContent;
    userAlreadyExist(): TServiceResWithoutContent;
    userSuccessfulyCreated(): TServiceResWithoutContent;
    userNotAuthorisated(): TServiceResWithoutContent;
    internalServerError(): TServiceResWithoutContent;
}
