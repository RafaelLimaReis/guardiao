import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { CrudItem } from '../pages/CrudItem'
import { ReactNode, useEffect, useState } from 'react'

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isLogged = localStorage.getItem('token');
    return isLogged ? children : <Navigate to='/login' />
}

export function Router() {
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => {
        const isLogged = localStorage.getItem('token') ? true : false;
        if (isLogged) {
            setIsLogged(true);
        }
    }, [])

    function handlerLoggout() {
        localStorage.removeItem('token');
        setIsLogged(false);  
    }
    function handlerLogin(token: string) {
        localStorage.setItem('token', token);
        setIsLogged(true);  
    }


    return (
        <Routes>
        <Route  path="/" element={<DefaultLayout isLogged={isLogged} handlerLoggout={handlerLoggout} />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login handlerLogin={handlerLogin} />} />
            <Route path="item/cadastrar" element={<PrivateRoute><CrudItem /></PrivateRoute>} />
            <Route path="item/:item" element={<PrivateRoute><CrudItem /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
    )
}
