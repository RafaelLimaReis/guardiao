import logoFaculdade from '../../assets/faculdade.png'
import { FooterContainer } from './styles'

export function Footer() {
    return (
        <FooterContainer>
            <img src={logoFaculdade} alt="logo da fatec" />
        </FooterContainer>
    )
}