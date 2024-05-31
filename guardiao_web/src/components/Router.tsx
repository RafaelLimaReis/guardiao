import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { CrudItem } from '../pages/CrudItem'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { ItemProps } from '../interfaces/Item'
import api from '../libs/axios'
import toast from 'react-hot-toast'

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
        notify('success', 'Você está deslogado');
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
                notify('success', 'Item atualizado com sucesso.');
            } else {
                const responseCadastro = await api.post('/item/cadastro', formData, { headers: { 'Content-Type': 'multipart/form-data'}});
                setItems((state) => [responseCadastro.data.data, ...state]);
                notify('success', 'Item cadastrado com sucesso.');
            }

            return true;
        } catch (error) {
            console.error(error);
            notify('error', 'Ocorreu um erro na operação.');
            return false;
        }
    }

    function notify(type: string, message: string) {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                toast(message)
                break;
        }
    }

    const getItems = useCallback(async () => {
        try {
            const items = await api.get('/item', {
                params: {
                    q: filter
                }
            });
            setItems(items.data);
        } catch (error) {
            notify('error', 'Ocorreu um erro ao buscar items.');
            console.log(error);
        }
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
            <Route path="login" element={<Login handlerLogin={handlerLogin} notify={notify} />} />
            <Route path="item/cadastrar" element={<PrivateRoute><CrudItem managerItem={managerItem}/></PrivateRoute>} />
            <Route path="item/:item" element={<PrivateRoute><CrudItem items={items} managerItem={managerItem} /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
    )
}
