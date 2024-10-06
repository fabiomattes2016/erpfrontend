import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PermissionsList from "src/components/PermissionsList";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { groupDTO } from "src/models/dto/groupDTO";
import { PermissionDetail } from "src/models/permission";
import { useRequests } from "src/utils/requests";

function AddGroup() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [infoMessage, setInfoMessage] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    
    const navigate = useNavigate()

    const {getPermissions, addGroup} = useRequests();

    async function handleGetPermissions() {
        const response = await getPermissions();

        if (!response.detail) {
            setPermissionsData(response.data.permissions);
        }
    }

    async function handleAddGroup() {
        const name = nameInput;
        const permissions = selectedPermissions.join(',');

        const data: groupDTO = {
            name,
            permissions
        };

        if (!name) {
            setInfoMessage('Preencha todos os campos!');
            return;
        }

        setRequestLoading(true);

        const response = await addGroup(data);

        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail);
        }

        navigate('/groups');
    }

    useEffect(() => {
        Promise.resolve(handleGetPermissions()).finally(() => {
            setRequestLoading(false)
        });
    }, []);

    return (
        <PermissionMiddleware codeName="add_group">
            <Helmet>
                <title>Adicionar um Cargo</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}

            <PageTitleWrapper>
                <PageTitle  
                    heading="Adicionar um Cargo"
                    subHeading="Adicionar um novo cargo e defina as suas permissões"

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

                    <PermissionsList 
                        permissionsData={permissionsData}
                        selectedPermissions={selectedPermissions}
                        setSelectedPermissions={setSelectedPermissions}
                    />

                    <Button 
                        variant="outlined"
                        sx={{width: 90, mt: 3}}
                        onClick={requestLoading ? () => null : handleAddGroup}
                        disabled={requestLoading}
                    >
                        Salvar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    );
}

export default AddGroup;