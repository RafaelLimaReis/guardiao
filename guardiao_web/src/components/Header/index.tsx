import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo2.svg'
import { HeaderContainer } from './styles'

interface HeaderProps {
    isLogged: boolean;
    handlerLoggout: () => void;
}

export function Header({isLogged, handlerLoggout}: HeaderProps) {
    const location = useLocation();
    const isLoginRoute = location.pathname === '/login';

    return (
        <HeaderContainer>
            <img src={logo} alt="Imagem de logo" />
            {!isLoginRoute && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                {
                    isLogged 
                    ? <>
                        <Link to={location.pathname.includes('/item') ? '/' : 'item/cadastrar'}>{location.pathname.includes('/item') ? 'Voltar' : 'Cadastrar novo item'}</Link>
                        <a onClick={handlerLoggout}>Sair</a>
                    </>
                    : <Link to={'login'}>Fazer Login</Link>
                }
            </div>
            )}
        </HeaderContainer>
    )
}