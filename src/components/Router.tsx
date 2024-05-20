import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'

export function Router() {
    return (
        <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/admin" element={<DefaultLayout />}>
            <Route path="login" element={<Login />} />
        </Route>
    </Routes>
    )
}
