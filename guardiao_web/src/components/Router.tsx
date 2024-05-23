import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { CrudItem } from '../pages/CrudItem'

export function Router() {
    return (
        <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
        </Route>
        <Route path="/admin" element={<DefaultLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="item/cadastro" element={<CrudItem />} />
            <Route path="item/:item" element={<CrudItem />} />
        </Route>
    </Routes>
    )
}
