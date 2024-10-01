import { Permission } from "./permission";

export type User = {
    name: string;
    email: string;
    password: string;
}

export type UserEnterpriseDetail = {
    is_owner: boolean;
    permissions: Permission[];
}

export type ApiGetUser = {
    user: User;
    enterprise: UserEnterpriseDetail;
}

export type ApiSignin = {
    user: User;
    enterprise: UserEnterpriseDetail;
    accessToken: string;
    refreshToken: string;
}