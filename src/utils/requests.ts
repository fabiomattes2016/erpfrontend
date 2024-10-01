import { ApiGetUser, ApiSignin } from "src/models/auth";
import { ApiGetPermissions } from "src/models/permission";
import { useApi } from "./api";
import { ApiGetGroup, ApiGetGroups } from "src/models/group";
import { ApiGetEmployee, ApiGetEmployess } from "src/models/employee";
import { ApiGetTask, ApiGetTasks } from "src/models/task";
import { signInDTO } from "src/models/dto/singInDTO";
import { groupDTO } from "src/models/dto/groupDTO";
import { employeeDTO } from "src/models/dto/employeeDTO";
import { taskDTO } from "src/models/dto/taskDTO";

const signIn = async (data: signInDTO) => {
    const response = await useApi<ApiSignin>('auth/signin', 'POST', data, false);
    return response;
}

const getUser = async () => {
    const response = await useApi<ApiGetUser>('auth/user');
    return response;
}

const getPermissions = async () => {
    const response = await useApi<ApiGetPermissions>('companies/permissions');
    return response;
}

const getGroups = async () => {
    const response = await useApi<ApiGetGroups>('companies/groups');
    return response;
}

const getAnGroup = async (groupId: number) => {
    const response = await useApi<ApiGetGroup>(`companies/groups/${groupId}`);
    return response;
}

const addGroup = async (data: groupDTO) => {
    const response = await useApi('companies/groups', 'POST', data);
    return response;
}

const editGroup = async (groupId: number, data: groupDTO) => {
    const response = await useApi(`/companies/groups/${groupId}`, 'PUT', data);
    return response;
}

const deleteGroup = async (groupId: number) => {
    const response = await useApi(`companies/groups/${groupId}`, 'DELETE');
    return response;
}

const getEmployees = async () => {
    const response = useApi<ApiGetEmployess>('companies/employess');
    return response;
}

const getAnEmployee = async (employeeId: number) => {
    const response = await useApi<ApiGetEmployee>(`companies/employees/${employeeId}`);
    return response;
}

const addEmployee = async (data: employeeDTO) => {
    const response = await useApi('companies/employees', 'POST', data);
    return response;
}

const editEmployee = async (employeeId: number, data: employeeDTO) => {
    const response = await useApi(`companies/employees/${employeeId}`, 'PUT', data);
    return response;
}

const deleteEmployee =  async (employeeId: number) => {
    const response = await useApi(`companies/employees/${employeeId}`, 'DELETE');
    return response;
}

const getTasks = async () => {
    const response = await useApi<ApiGetTasks>('companies/tasks');
    return response;
}

const getAnTask = async (taskId: number) => {
    const response = await useApi<ApiGetTask>(`companies/tasks/${taskId}`);
    return response;
}

const addTask = async (data: taskDTO) => {
    const response = await useApi<ApiGetTask>('companies/tasks', 'POST', data);
    return response;
}

const editTask = async(taskId: number, data: taskDTO) => {
    const response = await useApi<ApiGetTask>(`companies/tasks/${taskId}`, 'PUT', data);
    return response;
}

const deleteTask = async(taskId: number) => {
    const response = await useApi(`companies/tasks/${taskId}`, 'DELETE');
    return response;
}

export const useRequests = () => ({
    signIn,
    getUser,
    getPermissions,
    getGroups,
    getAnGroup,
    addGroup,
    editGroup,
    deleteGroup,
    getEmployees,
    getAnEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
    getTasks,
    getAnTask,
    addTask,
    editTask,
    deleteTask
})