import { Outlet } from 'react-router-dom'
import { Container, Main } from '../styles/global'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'


export function DefaultLayout() {
    return (
        <Container>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Container>
    )
}
