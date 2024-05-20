import { Outlet } from 'react-router-dom'
import { Container } from '../styles/global'


export function DefaultLayout() {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}
