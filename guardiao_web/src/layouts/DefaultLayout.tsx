import { Outlet } from 'react-router-dom'
import { Container, Main } from '../styles/global'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

interface DefaultLayoutProps {
    isLogged: boolean;
    handlerLoggout: () => void;
}

export function DefaultLayout({ isLogged, handlerLoggout }: DefaultLayoutProps) {

    return (
        <Container>
            <Header isLogged={isLogged} handlerLoggout={handlerLoggout} />
            <Main>
                <Outlet/>
            </Main>
            <Footer />
        </Container>
    )
}
