import { Group } from "./group";

export type Employee = {
    id: number;
    name: string;
    email: string;
}

export type EmployeeDetail = Employee & {
    groups: Group[];
}

export type ApiGetEmployess = {
    employess: Employee[];
}

export type ApiGetEmployee = EmployeeDetail