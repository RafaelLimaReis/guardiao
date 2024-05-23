import { Eye, EyeSlash } from 'phosphor-react'
import { Container, ContainerForm, InputPassword, ButtonLogin, Input } from './styles'
import { useState } from 'react'

export function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Container>
            <div>
                <p>Acessar Administrativo</p>
                <ContainerForm>
                    <label htmlFor="email">Digite seu email</label>
                    <Input type="email" name="email" placeholder="exemplo@gmail.com" id="email" />
                    
                    <label htmlFor="email">Digite sua senha</label>
                    <InputPassword>
                        <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" />
                        <button type="button" onClick={() => setPasswordVisible(state => !state)}>
                            {passwordVisible ? (<EyeSlash size={30} />) : (<Eye size={30} />)}
                        </button>
                    </InputPassword>

                    <ButtonLogin type="button">
                        Acessar
                    </ButtonLogin>
                </ContainerForm>
            </div>
        </Container>
    )
}