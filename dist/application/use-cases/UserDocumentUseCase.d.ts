import { IUserDocumentsRepository } from 'application/ports/IUserDocumentsRepository';
import { GetUserModel } from 'domain/models/GetUserModel';
import { PolisDMS } from 'domain/models/PolisDMS';
import { UserDocumentsModels } from 'domain/models/UserDocuments';
import { TServiceRes, TServiceResWithoutContent } from 'infrastructure/types/TServiceRes';
import { ServiceResponse } from 'infrastructure/utils/serviceResponse';
export declare class UserDocumentsUsecase {
    private readonly userDocumentsRepo;
    private readonly logger;
    serviceRes: ServiceResponse;
    constructor(userDocumentsRepo: IUserDocumentsRepository);
    addUserDocuments(doc: UserDocumentsModels): Promise<TServiceRes | TServiceResWithoutContent>;
    addUserPolis(pol: PolisDMS): Promise<TServiceRes | TServiceResWithoutContent>;
    getUserDocuments(user: GetUserModel): Promise<TServiceRes | TServiceResWithoutContent>;
}
