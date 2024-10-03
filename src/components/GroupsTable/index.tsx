import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useNavigate } from "react-router";
import { GroupDetail } from "src/models/group";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";

type Props = {
    groupsList: GroupDetail[];
    refreshList: () => void;
}

function GroupsTable({groupsList, refreshList}: Props) {
    const {handlePermissionExists} = useAuth();
    const {deleteGroup} = useRequests();
    const theme = useTheme();
    const navigate = useNavigate();

    function handleEditGroup(id: number) {
        navigate(`/groups/edit/${id}`);
    }

    async function handleDeleteGroup(id: number) {
        await deleteGroup(id);
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
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {groupsList.map((group) => (
                                <TableRow hover key={group.id}>
                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{group.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {group.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        {
                                            handlePermissionExists('change_group') &&
                                            <Tooltip title="Editar cargo" arrow>
                                                <IconButton onClick={() => handleEditGroup(group.id)}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }

                                        {
                                            handlePermissionExists('delete_group') &&
                                            <Tooltip title="Excluir cargo" arrow>
                                                <IconButton onClick={() => handleDeleteGroup(group.id)}>
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

export default GroupsTable;