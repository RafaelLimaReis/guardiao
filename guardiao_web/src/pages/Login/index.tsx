import { Eye, EyeSlash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';
import { Container, ContainerForm, InputPassword, ButtonLogin, Input } from './styles'
import { useState } from 'react'
import api from '../../libs/axios';
import axios, { AxiosResponse } from 'axios';

interface LoginProps {
    handlerLogin: (token: string) => void;
    notify: (type: string, message: string) => void;
}

export function Login({handlerLogin, notify}: LoginProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handlerSubmitForm = async () => {
        try {
            const responseLogin: AxiosResponse = await api.post('/auth/login', { password: password, email: email});
            handlerLogin(responseLogin.data.data.token);
            navigate('/');
            notify('success', 'Login realizado com sucesso');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                //TODO tela de erro
                // Se for, você pode acessar as propriedades específicas do erro Axios
                console.error('Erro de solicitação Axios:', error.message);
                notify('error', error.response?.data);
              } else {
                // Se não for um erro Axios, apenas imprima o erro geral
                console.error('Erro ao fazer a solicitação:', error);
                notify('error', 'Ocorreu um erro');
              }
        }
    }

    return (
        <Container>
            <div>
                <p>Acessar Administrativo</p>
                <ContainerForm>
                    <label htmlFor="email">Digite seu email</label>
                    <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="exemplo@gmail.com" id="email" />
                    
                    <label htmlFor="email">Digite sua senha</label>
                    <InputPassword>
                        <input onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? 'text' : 'password'} name="password" id="password" />
                        <button type="button" onClick={() => setPasswordVisible(state => !state)}>
                            {passwordVisible ? (<EyeSlash size={30} />) : (<Eye size={30} />)}
                        </button>
                    </InputPassword>

                    <ButtonLogin type="button" onClick={handlerSubmitForm}>
                        Acessar
                    </ButtonLogin>
                </ContainerForm>
            </div>
        </Container>
    )
}