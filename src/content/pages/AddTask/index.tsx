import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import SelectEmployee from "src/components/SelectEmployee";
import SelectTaskStatus from "src/components/SelectTaskStatus";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { taskDTO } from "src/models/dto/taskDTO";
import { useDate } from "src/utils/formatDate";
import { useRequests } from "src/utils/requests";

function AddTask() {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<number | ''>('');

    const navigate = useNavigate();
    const {formatDateForApi} = useDate();
    const {addTask} = useRequests();

    async function handleAddTask() {
        const [title, description, employee_id, status_id] = [titleInput, descriptionInput, selectedEmployee, selectedStatus];
        const due_date = dateTimeInput ? formatDateForApi(dateTimeInput) : null;

        if(!title || !employee_id) {
            setInfoMessage('Preencha todos os campos!');
            return;
        }

        const data: taskDTO = {
            title,
            description,
            due_date: due_date ? due_date : null,
            employee_id,
            status_id
        }

        setRequestLoading(true);

        const response = await addTask(data);

        setRequestLoading(false);

        if(response.detail) {
            setInfoMessage(response.detail);
            return;
        }

        navigate('/tasks');
    }

    return (
        <PermissionMiddleware codeName="add_task">
            <Helmet>
                <title>Adicionar uma Tarefa</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}

            <PageTitleWrapper>
                <PageTitle heading="Adicionar uma Tarefa" subHeading="Adicione tarefas para os funcionários" />
            </PageTitleWrapper>

            <Snackbar   
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={infoMessage}
            />

            <Container maxWidth='lg'>
                <Stack maxWidth={700} spacing={3}>
                    <TextField 
                        fullWidth
                        label="Título *"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />

                    <TextField 
                        fullWidth
                        label="Descrição"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                    />

                    <TextField 
                        type="datetime-local"
                        fullWidth
                        value={dateTimeInput}
                        onChange={(e) => setDateTimeInput(e.target.value)}
                    />

                    <SelectEmployee selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />

                    <SelectTaskStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

                    <Button 
                        variant="outlined" 
                        sx={{width: 90, mt: 3, mb: 5}}
                        onClick={requestLoading ? () => null : handleAddTask}
                        disabled={requestLoading}
                    >
                        Adicionar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )
}

export default AddTask;