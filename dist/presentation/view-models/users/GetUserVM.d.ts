import { GetUserModel } from 'domain/models/GetUserModel';
export declare class GetUserVM {
    email: string;
    static fromViewModel(vm: GetUserVM): GetUserModel;
}
