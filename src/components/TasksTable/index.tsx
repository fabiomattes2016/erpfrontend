import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";
import { Task } from "src/models/task";
import { useDate } from "src/utils/formatDate";

type Props = {
    tasksList: Task[];
    refreshList: () => void;
}

function TasksTable({tasksList, refreshList}: Props) {
    const {handlePermissionExists} = useAuth();
    const {formatApiDate} = useDate();
    const {deleteTask} = useRequests();
    const theme = useTheme();
    const navigate = useNavigate();

    function handleEditTask(id: number) {
        navigate(`/tasks/edit/${id}`);
    }

    async function handleDeleteTask(id: number) {
        await deleteTask(id);
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
                                <TableCell>Título</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Prazo Máx.</TableCell>
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tasksList.map((task) => (
                                <TableRow hover key={task.id}>
                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{task.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.title}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.status}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {task.due_date ? formatApiDate(task.due_date) : 'Sem prazo definido'}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        {
                                            handlePermissionExists('change_task') &&
                                            <Tooltip title="Editar Tarefa" arrow>
                                                <IconButton 
                                                    onClick={() => handleEditTask(task.id)}
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
                                            handlePermissionExists('delete_task') &&
                                            <Tooltip title="Excluir Tarefa" arrow>
                                                <IconButton 
                                                    onClick={() => handleDeleteTask(task.id)}
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

export default TasksTable;