import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { CrudItem } from '../pages/CrudItem'
import { ReactNode } from 'react'

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isAdmin = localStorage.getItem('token');
    console.log(isAdmin);
    return isAdmin ? children : <Navigate to='/login' />
}

export function Router() {
    return (
        <Routes>
        <Route  path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="item/cadastro" element={<PrivateRoute><CrudItem /></PrivateRoute>} />
            <Route path="item/:item" element={<PrivateRoute><CrudItem /></PrivateRoute>} />
        </Route>
    </Routes>
    )
}
