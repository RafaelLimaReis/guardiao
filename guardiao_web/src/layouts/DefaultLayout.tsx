import { Outlet } from 'react-router-dom'
import { Container, Main } from '../styles/global'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Toaster } from 'react-hot-toast';

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
            <Toaster position='bottom-center' toastOptions={{
                style: {border: '1px solid #E8EAE9'}
            }} />
            <Footer />
        </Container>
    )
}
