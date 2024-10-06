import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import EmployessTable from "src/components/EmployeesTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { Employee } from "src/models/employee";
import { useRequests } from "src/utils/requests";

function Employees() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [employeesData, setEmployeesData] = useState<Employee[]>([]);

    const {getEmployees} = useRequests();

    async function handleGetEmployees() {
        const response = await getEmployees();
        setEmployeesData(response.data.employees);
        setRequestLoading(false);
    }

    useEffect(() => {
        handleGetEmployees();
    }, []);

    return (
        <PermissionMiddleware codeName="view_employee">
            <>
                <Helmet>
                    <title>Funcionários</title>
                </Helmet>

                <PageTitleWrapper>
                    <PageTitle heading="Funcionários" subHeading="Consulte os funcionários da empresa..." />
                </PageTitleWrapper>
            </>

            <Container 
                maxWidth="xl"
                sx={{
                    marginX: requestLoading ? '-10%' : 0,
                    transition: 'all .5s'
                }}
            >
                <EmployessTable 
                    refreshList={handleGetEmployees}
                    employeesList={employeesData}
                />
            </Container>
        </PermissionMiddleware>
    )
}

export default Employees;