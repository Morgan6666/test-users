import { Login } from 'domain/models/Login';
export declare class UserLoginVM {
    email: string;
    password: string;
    static fromViewModel(vm: UserLoginVM): Login;
}
