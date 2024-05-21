import { Outlet } from 'react-router-dom'
import { Container, Main } from '../styles/global'
import { Footer } from '../components/Footer'


export function DefaultLayout() {
    return (
        <Container>
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Container>
    )
}
