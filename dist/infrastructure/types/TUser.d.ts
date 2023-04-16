export type TGetUser = {
    id: number;
    email: string;
    password: string;
};
export type TGetUserByEmail = {
    first_name: string;
    last_name: string;
    email: string;
};
export type TGetUserIdByEmail = {
    id: number;
};
export type TSign = {
    id: number;
};
export type TGetUserDocument = {
    polis_oms: string;
    snils: string;
    polis_dms: string;
    insurance_company: string;
    insurance_surename: string;
};
export type TCheckPolisExist = {
    id: number;
};
export type TCheckUserDocument = {
    id: number;
};
