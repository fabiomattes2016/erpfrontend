import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { Employee } from "src/models/employee";
import { useRequests } from "src/utils/requests";

type Props = {
    selectedEmployee: number | '';
    setSelectedEmployee: (employeeId: number) => void;
}

function SelectEmployee({selectedEmployee, setSelectedEmployee}: Props) {
    const [employeesData, setEmployeesData] = useState<Employee[]>([]);

    const {getEmployees} = useRequests();

    async function handleGetEmployees() {
        const response = await getEmployees();

        if (!response.detail) setEmployeesData(response.data.employees);
    }

    useEffect(() => {
        handleGetEmployees();
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um Funcionário *</InputLabel>
            <Select
                value={selectedEmployee}
                label="Selecione um Funcionário"
                onChange={(e) => setSelectedEmployee(+e.target.value)}
            >
                {employeesData.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>{employee.name} - {employee.email}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectEmployee;