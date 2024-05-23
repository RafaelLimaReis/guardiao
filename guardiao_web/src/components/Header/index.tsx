import logo from '../../assets/logo2.svg'
import { HeaderContainer } from './styles'

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} alt="Imagem de logo" />
        </HeaderContainer>
    )
}