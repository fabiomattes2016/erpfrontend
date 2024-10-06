import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { Employee } from "src/models/employee"
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";

type Props = {
    employeesList: Employee[];
    refreshList: () => void;
}

function EmployessTable({employeesList, refreshList}: Props) {
    const {handlePermissionExists} = useAuth();
    const {deleteEmployee} = useRequests();
    const theme = useTheme();
    const navigate = useNavigate();

    function handleEditEmployee(id: number) {
        navigate(`/employees/edit/${id}`);
    }

    async function handleDeleteEmployee(id: number) {
        await deleteEmployee(id);
        refreshList();
    }

    return (
        <Container maxWidth='lg'>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {employeesList.map((employee) => (
                                <TableRow hover key={employee.id}>
                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{employee.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {employee.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {employee.email}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        {
                                            handlePermissionExists('change_employee') &&
                                            <Tooltip title="Editar funcionário" arrow>
                                                <IconButton 
                                                    onClick={() => handleEditEmployee(employee.id)}
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color='inherit'
                                                    size='small'
                                                >
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }

                                        {
                                            handlePermissionExists('delete_employee') &&
                                            <Tooltip title="Excluir funcionário" arrow>
                                                <IconButton 
                                                    onClick={() => handleDeleteEmployee(employee.id)}
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.error.main
                                                    }}
                                                    color='inherit'
                                                    size='small'
                                                >
                                                    <DeleteTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    );
}

export default EmployessTable
