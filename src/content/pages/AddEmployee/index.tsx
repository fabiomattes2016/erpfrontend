import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { employeeDTO } from "src/models/dto/employeeDTO";
import { useRequests } from "src/utils/requests";

function AddEmployee() {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const navigate = useNavigate();

    const {addEmployee} = useRequests();

    async function handleAddEmployee() {
        const [name, email, password] = [nameInput, emailInput, passwordInput];

        if(!name || !email || !password) {
            setInfoMessage('Preencha todos os campos!');
            return;
        }

        const data: employeeDTO = {
            name,
            email,
            password
        }

        setRequestLoading(true);

        const response = await addEmployee(data);

        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail);
        }

        navigate('/employees');
    }

    return (
        <PermissionMiddleware codeName="add_employee">
            <Helmet>
                <title>Adicionar um Cargo</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}

            <PageTitleWrapper>
                <PageTitle  
                    heading="Adicionar um Funionário"
                    subHeading="Adicionar um novo funcionário"

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

                    <TextField 
                        type="password"
                        fullWidth
                        label="Senha *"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />

                    <Button 
                        variant="outlined"
                        sx={{width: 90, mt: 3}}
                        onClick={requestLoading ? () => null : handleAddEmployee}
                        disabled={requestLoading}
                    >
                        Salvar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )
}

export default AddEmployee;