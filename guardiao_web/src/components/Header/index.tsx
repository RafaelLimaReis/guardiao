import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo2.svg'
import { HeaderContainer } from './styles'
import { useEffect, useState } from 'react';

export function Header() {
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => {
        const isAdmin = localStorage.getItem('token') ? true : false;
        if (isAdmin) {
            setIsLogged(true);
        }
    }, [])
    const location = useLocation();

    function handlerLoggout() {
        localStorage.removeItem('token');
        setIsLogged(false);  
    }

    return (
        <HeaderContainer>
            <img src={logo} alt="Imagem de logo" />
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
        </HeaderContainer>
    )
}