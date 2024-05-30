import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { CrudItem } from '../pages/CrudItem'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { ItemProps } from '../interfaces/Item'
import api from '../libs/axios'

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isLogged = localStorage.getItem('token');
    return isLogged ? children : <Navigate to='/login' />
}

export function Router() {
    const [isLogged, setIsLogged] = useState(false);
    const [filter, setFilter] = useState('');
    const [items, setItems] = useState<ItemProps[]>([]);
    
    function handlerLoggout() {
        localStorage.removeItem('token');
        setIsLogged(false);  
    }

    function handlerLogin(token: string) {
        localStorage.setItem('token', token);
        setIsLogged(true);  
    }

    async function managerItem(formData: FormData|object, itemUpdate?:ItemProps) {
        try {
            if (itemUpdate) {
                const responseUpdate = await api.put('/item/cadastro', formData);
                const ItemsWithoutUpdated = items.filter(item => {
                    return item._id !== itemUpdate._id
                });
                ItemsWithoutUpdated.push(responseUpdate.data.data);

                setItems(ItemsWithoutUpdated);
            } else {
                const responseCadastro = await api.post('/item/cadastro', formData, { headers: { 'Content-Type': 'multipart/form-data'}});
                setItems((state) => [responseCadastro.data.data, ...state]);
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const getItems = useCallback(async () => {
        const items = await api.get('/item', {
            params: {
                q: filter
            }
        });
        setItems(items.data);
    }, [filter])

    useEffect(() => {
        getItems()
    }, [filter, getItems])

    useEffect(() => {
        const isLogged = localStorage.getItem('token') ? true : false;
        if (isLogged) {
            setIsLogged(true);
        }
    }, [])

    return (
        <Routes>
        <Route  path="/" element={<DefaultLayout isLogged={isLogged} handlerLoggout={handlerLoggout} />}>
            <Route path="/" element={<Home isLogged={isLogged} items={items} setFilter={setFilter} />} />
            <Route path="login" element={<Login handlerLogin={handlerLogin} />} />
            <Route path="item/cadastrar" element={<PrivateRoute><CrudItem managerItem={managerItem}/></PrivateRoute>} />
            <Route path="item/:item" element={<PrivateRoute><CrudItem items={items} managerItem={managerItem} /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
    )
}
