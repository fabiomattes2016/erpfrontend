import { Box, Button, Card, Container, Snackbar, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MuiAlert from '@mui/material/Alert';
import { useAuth } from "src/utils/auth";
import {signInDTO} from "src/models/dto/singInDTO";
import { useNavigate } from "react-router";

const MainContent = styled(Box)(() => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`);

function SignIn() {
    const navigate = useNavigate();
    const [snackBarMessage, setSnackBarMessge] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const {handleSignIn} = useAuth();

    const handleSignInButton = async () => {
        if (!emailInput || emailInput == '' || !passwordInput || passwordInput == '') {
            setSnackBarMessge('Preencha todos os campos!');
            return;
        }

        const data: signInDTO = {
            email: emailInput,
            password: passwordInput
        };

        const requestSignIn = await handleSignIn(data);

        if (requestSignIn.detail) {
            setSnackBarMessge(requestSignIn.detail);
            return;
        }

        navigate('/');
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <Snackbar open={snackBarMessage != ''} autoHideDuration={6000} onClose={() => setSnackBarMessge('')}>
                <MuiAlert style={{color: 'whitesmoke'}} severity="error">{snackBarMessage}</MuiAlert>
            </Snackbar>

            <MainContent>
                <Container maxWidth="sm">
                    <Card sx={{textAlign: 'center', mt: 3, p: 4}}>
                        <Stack spacing={3}>
                            <TextField label="Seu E-mail..." type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                            <TextField label="Sua Senha..." type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
                            <Button onClick={handleSignInButton} variant="outlined" style={{marginTop: 40}}>Entrar</Button>
                        </Stack>
                    </Card>
                </Container>
            </MainContent>
        </>
    );
}

export default SignIn;