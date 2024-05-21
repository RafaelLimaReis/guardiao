import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'

export function Router() {
    return (
        <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
        </Route>
        <Route path="/admin" element={<DefaultLayout />}>
            <Route path="login" element={<Login />} />
        </Route>
    </Routes>
    )
}
