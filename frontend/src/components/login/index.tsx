import { FC, SyntheticEvent, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Label, Input, Button } from 'reactstrap';
import NotificationHubContext from '../../context/notificationHubProvider';
import { postLogin } from '../../services/user';
import { getTokenExpDate } from '../../utilities/token';
import { Background, Card, Form, Header } from './styles';

const Login: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { dispatcher } = useContext(NotificationHubContext);

    const [, setCookies, removeCookie] = useCookies();

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await postLogin(email, password);
            if (res && res.status === 200) {
                dispatcher(
                    {
                        type: "NOTIFY",
                        payload: { type: "SUCCESS", message: res.data.message }
                    }
                );
                setCookies("bearer", res.data.bearer, { path: "/", expires: getTokenExpDate(res.data.bearer!) });
                setCookies("token", res.data.refreshToken, { path: "/", expires: getTokenExpDate(res.data.refreshToken!) });
            }
        } catch (e) {
            dispatcher(
                {
                    type: "NOTIFY",
                    payload: { type: "ERROR", message: e.response?.data?.message || "Ocorreu um erro inesperado." }
                }
            );
            console.error(e.response?.data?.message);
            removeCookie("bearer", { path: "/" });
            removeCookie("token", { path: "/" });
        }
    }

    return (
        <Background>
            <Card>
                <Form onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="inputEmail" className="sr-only">Email</Label>
                        <Input type="email" id="inputEmail" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Label htmlFor="inputSenha" className="sr-only">Senha</Label>
                        <Input type="password" id="inputSenha" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button block outline color="success" type="submit">Sign in</Button>
                </Form>
                <div>
                    <div className="d-flex flex-row-reverse">
                        <Link to="/register">Cadastrar uma conta</Link>
                    </div>
                </div>
            </Card>
            <Header>
                <h1>Gerenciador de Fichas<br />TTRPG</h1>
            </Header>
        </Background>
    );
}

export default Login;