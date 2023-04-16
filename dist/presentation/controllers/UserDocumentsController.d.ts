import { UserDocumentsUsecase } from "application/use-cases/UserDocumentUseCase";
import { UserDocumentsModels } from "domain/models/UserDocuments";
import { PolisVM } from "presentation/view-models/documents/PolisVM";
import { GetUserVM } from "presentation/view-models/users/GetUserVM";
export declare class UserDocumentsController {
    private readonly userDocumentsUsecase;
    constructor(userDocumentsUsecase: UserDocumentsUsecase);
    addUserDocuments(userDocuments: UserDocumentsModels): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    addPolisDms(userPolis: PolisVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    getDocs(user: GetUserVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
}
