import { MagnifyingGlass } from "phosphor-react";
import { ContainerItems, InputSearch } from "./styles";

import { ContainerMain } from "../../styles/global";
import { useCallback, useEffect, useState } from "react";
import api from "../../libs/axios";
import { ItemProps } from "../../interfaces/Item";
import { format } from "date-fns";

export function Home() {
    const isLogged = localStorage.getItem('token') ? true : false;
    const [filter, setFilter] = useState('');
    const [items, setItems] = useState<ItemProps[]>([]);

    const getItems = useCallback(async () => {
        console.log(filter);
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
    
    return (
        <ContainerMain>
            <h1>itens encontrados</h1>
            <InputSearch>
                <input type="text" name="input_seach" id="input_seach" placeholder="Buscar..."  onChange={(e) => setFilter(e.target.value)}/>
                <button type="button">
                    <MagnifyingGlass size={20} />
                </button>
            </InputSearch>

            <ContainerItems islogged={isLogged}>
                {items.map(item => (
                    <div key={item._id}>
                        <img src={`http://localhost:3004${item.image}`} alt="" />
                        <div>
                            <span><b>Item:</b> {item.name}</span>
                            <span><b>Data:</b> {format(new Date(item.data), "dd/MM/yyyy")}</span>
                            <span><b>Local:</b> {item.local}</span>
                            <span><b>Periodo:</b> {item.periodo}</span>
                        </div>
                    </div>
                ))}
            </ContainerItems>
        </ContainerMain>
    )
}