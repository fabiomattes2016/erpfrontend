import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { employeeDTO } from "src/models/dto/employeeDTO";
import { useRequests } from "src/utils/requests";

function EditEmployee() {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const navigate = useNavigate();
    const {id: employeeId} = useParams();
    const {editEmployee, getAnEmployee} = useRequests();

    async function handleGetAnEmployee() {
        const response = await getAnEmployee(+employeeId);

        if (!response.detail) {
            setNameInput(response.data.name);
            setEmailInput(response.data.email);
        }
    }

    async function handleEditEmployee() {
        const [name, email] = [nameInput, emailInput];

        if(!name || !email) {
            setInfoMessage('Preencha todos os campos!');
            return;
        }

        const data: employeeDTO = {
            name,
            email
        }

        setRequestLoading(true);

        const response = await editEmployee(+employeeId, data);

        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail);
        }

        navigate('/employees');
    }

    useEffect(() => {
        Promise.resolve(handleGetAnEmployee()).finally(() => {
            setRequestLoading(false);
        });
    }, [])

    return (
        <PermissionMiddleware codeName="change_employee">
            <Helmet>
                <title>Editar um Funionário</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}

            <PageTitleWrapper>
                <PageTitle  
                    heading="Editar um Funionário"
                    subHeading="Editar um novo funcionário"

                />
            </PageTitleWrapper>

            <Snackbar  
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={infoMessage}
            />

            <Container maxWidth="lg">
                <Stack maxWidth={700} spacing={3}>
                    <TextField 
                        fullWidth
                        label="Nome *"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />

                    <TextField 
                        type="email"
                        fullWidth
                        label="E-mail *"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />

                    <Button 
                        variant="outlined"
                        sx={{width: 90, mt: 3}}
                        onClick={requestLoading ? () => null : handleEditEmployee}
                        disabled={requestLoading}
                    >
                        Salvar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )
}

export default EditEmployee;