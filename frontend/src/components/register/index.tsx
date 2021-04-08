import { FC, FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import NotificationHubContext from '../../context/notificationHubProvider';
import { postRegister } from '../../services/user';
import InputText from '../inputText';
import { ButtonContainer, Container, Form } from './styles';

const Register: FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passConfirm, setPassConfirm] = useState<string>("");

    const { dispatcher } = useContext(NotificationHubContext);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await postRegister(name, email, password, passConfirm);
            if (res && res.status === 201)
                dispatcher(
                    {
                        type: "NOTIFY",
                        payload: { type: "SUCCESS", message: res.data.message }
                    }
                );
        } catch (e) {
            dispatcher(
                {
                    type: "NOTIFY",
                    payload: { type: "ERROR", message: e.response?.data?.message || "Ocorreu um erro inesperado." }
                }
            );
            console.error(e.response?.data?.message);
        }
        setName("");
        setEmail("");
        setPassword("");
        setPassConfirm("");
    }

    return (
        <Container>
            <header className="d-flex flex-row mt-4 justify-content-center">
                <h1 style={{color: "white"}}>Cadastro de usuário</h1>
            </header>
            <Form onSubmit={formSubmit}>
                <InputText key="name" valueHandler={[name, setName]} placeholder={"Nome"} required>Nome</InputText>
                <InputText key="email" valueHandler={[email, setEmail]} placeholder={"Email"} type="email" required>Email</InputText>
                <InputText key="password" valueHandler={[password, setPassword]} placeholder={"Senha"} type="password" required>Senha</InputText>
                <InputText key="pass-confirm" valueHandler={[passConfirm, setPassConfirm]} placeholder={"Confirme sua senha"} type="password" required>Confirme sua senha</InputText>
                <ButtonContainer>
                    <Link to="/login">Já possuo uma conta...</Link>
                    <Button type="submit" color="outline-success">Concluir</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
}

export default Register;